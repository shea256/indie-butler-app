// <script src="../../lib/requests/get.js"></script>
// <script src="../../lib/ping.js"></script>
require(["../../lib/routes.js", "../../lib/utils/ping.js"], function(app, ping) {
  window.app = app;
  var domain = localStorage.getItem("domain");
  var ioOptions = {
    'max reconnection attempts' : 100000,
    'reconnection limit'        : 1000 * 60 * 10,
    'reconnect'                 : false,
    'force new connection'      : true,
  };

  if(domain) {
    console.log('Butler up!', domain);
    var relay = 'http://local.jit.su/';
    var socket = io.connect(relay, ioOptions);
    socket.on('connect', function() {
      console.log('Try to auth as', domain);
      socket.on('session', function(sid) {
        var params = {
          'me': domain,
          'sid': sid
        };
        jQuery.get(relay + 'connect', params, function(data, status, jqXHR) {
          if(data.bound == true && data.domain === domain) {
            // Awesome... we are connected!
            console.log('We are connected as', domain);
          }
          else {
            // Looks like we're not connected. So let's ask the user to do so.
            window.open(relay + 'relmeauth?me=' + domain);
          }
        });
      });

      /* requests*/
      socket.on('request', function (request, fn) {
        var req = request;
        var resp = {body: "", headers: {}, status: 200};
        app.handle(req, resp, function() {
          fn(resp);
        });
      });
    });
    socket.on('disconnect', function() {
      console.log('disconnected');
    });
  }

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.path) {
      var response = {body: JSON.stringify([]), headers: {}}
      app.handle(request, response, function(stream) {
        sendResponse(stream)
      })
      return true;
    } else {
      if(typeof(sender.id) === 'undefined') {
        sender.id = Math.random().toString(36).substring(8);
      }

      console.log(request)
      console.log(sender)

      app.store.put(request, function(result) {
        console.log(result)
      });

      if (domain) {
        ping('http://butler.' + domain + '/stream.atom', function(err, obj) {
          console.log('Hub pinged');
        });
      }
    }
  });
});

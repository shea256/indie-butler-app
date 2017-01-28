function postStory() {
  $('#post-message').submit(function() {
    var activity = {
      "actor": {
        "displayName": "Ryan Shea",
        "id": "ryan.id",
        "objectType": "person",
        "url": "http://shea.io"
      },
      "content": $('#message-content').val(),
      "object": {
        "displayName": $('#message-content').val(),
        "objectType": "note",
        "content": $('#message-content').val()
      },
      "published": new Date().getTime(),
      "provider": {
        "objectType": "service",
        "displayName": "Butler",
        "url": "https://github.com/julien51/indie-butler-app"
      },
      "title": $('#message-content').val(),
      "verb": "post",
      "id": ["post", new Date().getTime()].join('-')
    };

    chrome.runtime.sendMessage(activity, function(response) {
      console.log(response)
    })
    window.location = 'home.html';
    return false;
  });
}

postStory();
if (location.host === "twitter.com") {
    $(".tweet-button").live('click', function(evt) {
      var content = $('#tweet-box-mini-home-profile').val();

      var activity = {
            "actor": {
                "displayName": $("b.fullname:first").text(),
                "id": "http:\/\/twitter.com" + $(".account-summary:first").attr('href'),
                "objectType": "person",
                "url": "http:\/\/twitter.com" + $(".account-summary:first").attr('href')
            },
            "content": content,
            "object": {
                "displayName": content,
                "objectType": "note",
                "content": content
            },
            "published": new Date().getTime(),
            "provider": {
                "objectType": "service",
                "displayName": "Twitter",
                "url": "http:\/\/twitter.com\/"
            },
            "title": content,
            "verb": "post"
        };

        console.log(activity);

        // And now, let's send that to the background page, so it can save it!
        chrome.extension.sendRequest(activity, function(){
          // Not care.
        });
    });
}
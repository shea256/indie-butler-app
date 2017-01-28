function sendTweet() {
    var content = $(".stream-items .js-tweet-text-container p")[0].innerHTML
    console.log(content)

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
        "verb": "post",
        "id": ["post", new Date().getTime()].join('-')
    };

    // And now, let's send that to the background page, so it can save it!
    chrome.runtime.sendMessage(activity, function(response) {
        console.log(response)
    })
    return false;    
}

if (location.host === "twitter.com") {
    $(".tweet-button").live('click', function(event) {
        var lastTweetCount = 0
        var newTweetDetected = false
        var checkIfExists = setInterval(function() {
            var currentTweetCount = $(".stream-items .js-tweet-text-container p").length
            console.log("Last: " + lastTweetCount + "; Current: " + currentTweetCount + "; New detected: " + newTweetDetected)

            if (currentTweetCount === lastTweetCount + 1) {
                newTweetDetected = true
                console.log("New tweet detected!")
            }
            if (newTweetDetected && currentTweetCount === lastTweetCount) {
                console.log("Tweet count stabilized!");
                clearInterval(checkIfExists);
                sendTweet();
            }
            lastTweetCount = currentTweetCount
        }, 100);        
    });
}

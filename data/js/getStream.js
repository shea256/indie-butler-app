function getStream() {
  var request = {
    method: 'get',
    path: '/stream.json',
    headers: {}
  }

  chrome.runtime.sendMessage(request, function(response) {
    console.log(response)
    var list = JSON.parse(response.body);
    list.forEach(function(entry) {
      console.log(entry)
      var entryDiv = $('<tr></tr>');
      var contentDiv = $(['<td>', entry.content, '</td>'].join(''));
      entryDiv.append(contentDiv);
      $('#entries').append(entryDiv);
    });
  });
}

getStream()
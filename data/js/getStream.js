function getStream() {
  var request = {
    method: 'get',
    path: '/stream.json',
    headers: {}
  }

  chrome.runtime.sendMessage(request, function(response) {
    console.log(JSON.parse(response.body))
    var list = JSON.parse(response.body);
    list.forEach(function(entry) {
      var entryDiv = $('<tr></tr>');
      var nameDiv = $(['<td>', entry.actor.displayName, '</td>'].join(''));
      var dateString = new Date(entry.published).toString().split(" GMT")[0];
      var publishedDiv = $(['<td>', dateString, '</td>'].join(''));
      var contentDiv = $(['<td>', entry.content, '</td>'].join(''));
      entryDiv.append(nameDiv);
      entryDiv.append(publishedDiv);
      entryDiv.append(contentDiv);
      $('#entries').append(entryDiv);
    });
  });
}

getStream()
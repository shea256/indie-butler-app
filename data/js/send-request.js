chrome.runtime.sendMessage(null, {
  method: 'get',
  path: '/stream.json',
  headers: {}
}, function(resp) {
  var list = JSON.parse(resp.body);
  list.forEach(function(entry) {
    console.log(entry)
    var e = $('<tr></tr>');
    var c = $(['<td>', entry.content, '</td>'].join(''));
    e.append(c);
    $('#entries').append(e);
  });
});
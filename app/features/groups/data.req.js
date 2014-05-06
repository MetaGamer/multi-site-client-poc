var $ = require('jquery')
var hub = require('widget').hub

var cache
function broadcast() {
  hub.trigger('groups:loaded', cache)
}

var groups = {

  fetch: function() {
    //$.get('http://api.secularconnect.org/cache?type=group&limit=5', function(groups) {
    cache = [{title: 'Nicks Test 1', state: 'State 1'}, {title: 'Nicks Test 2', state: 'State 2'}, {title: 'Nicks Test 3', state: 'State 3'}]
    broadcast()
    //}
  },

  ensure: function() {
    if (cache) broadcast()
    else this.fetch()
  }
}

hub.on('groups:needed', groups.ensure, groups)

module.exports = groups


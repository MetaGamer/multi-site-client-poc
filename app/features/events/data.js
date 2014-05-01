
var $ = require('jquery')
var hub = require('widget').hub

var cache
function broadcast() {
  hub.trigger('events:loaded', cache)
}

module.exports = {

  fetch: function() {
    $.get('http://secularstates.wpengine.com/wp-json/posts?type=events', function(events) {
      cache = events
      broadcast()
    })
  },

  ensure: function() {
    if (cache) broadcast()
    else this.fetch()
  }
}

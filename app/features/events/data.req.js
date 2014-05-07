
var $ = require('jquery')
var hub = require('widget').hub

var cache
function broadcast() {
  hub.trigger('events:loaded', cache)
}

var events = {

  fetch: function() {
    $.get('http://secularstates.wpengine.com/wp-json/posts?type=events', function(events) {
      cache = events
      broadcast()
    })
  },

  ensure: function() {
    if (cache) broadcast()
    else this.fetch()
  },

  bySlug: function(slug, cb) {
    $.get('http://secularstates.wpengine.com/wp-json/posts?type=events&filter[name]=' + slug, function(events) {
      if (events && events[0]) cb(events[0])    
    })
  }
}

hub.on('events:needed', events.ensure, events)
hub.on('event:fromSlug', events.bySlug, events)

module.exports = events

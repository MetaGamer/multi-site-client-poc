
var rsvp = require('rsvp')
var $ = require('jquery')
var Backbone = require('backbone')
var hub = require('widget').hub

var cache
function broadcast() {
  hub.trigger('site:loaded', cache)
}

var Site = Backbone.Model.extend({ })

var site = {

  fetch: function() {
    return new rsvp.Promise(function(res, rej) {
      $.get('http://secularstates.wpengine.com/wp-json/', function(site) {
        cache = site
        broadcast()
      })
    })
  },

  ensure: function() {
    if (cache) broadcast()
    else this.fetch()
  }
}

hub.on('site:needed', site.ensure, site) 

module.exports = site



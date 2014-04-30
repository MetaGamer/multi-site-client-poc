
var rivets = require('rivets')
require('./rivets_config')

var Backbone = require('backbone')
var $ = require('jquery')
Backbone.$ = $
var hub = require('widget').hub

// keep this hacky comment block...
// require all widgets

var vm = {
  site: {
    title: 'Multi Site POC'
  },
  toHome: function() {
    hub.trigger('enable:page', 'home')
  },
  toEvents: function() {
    hub.trigger('enable:page', 'events')
  }
}

rivets.bind(document.getElementById('app'), vm)

var router = new Backbone.Router
router.route('', 'home', vm.toHome)
router.route('/events', 'events', vm.toEvents)
Backbone.history.start({ pushState: true })


var rivets = require('rivets')
require('./util/rivets_config')
var Backbone = require('backbone')
var $ = require('jquery')
Backbone.$ = $
var hub = require('./util/hub')

var homePage = require('./widgets/home_page')
var eventsPage = require('./widgets/events_page')

var vm = {
  site: {
    title: 'Multi Site POC'
  },
  widgets: {
    homePage: homePage,
    eventsPage: eventsPage
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

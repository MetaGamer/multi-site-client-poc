
var rivets = require('rivets')
require('./rivets_config')

var Backbone = require('backbone')
var $ = require('jquery')
Backbone.$ = $
var hub = require('widget').hub

require('./layouts/home_page/home_page_widget')
require('./features/posts/widgets/post_list/widget')

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

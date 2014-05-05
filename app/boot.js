
var rivets = require('rivets')
require('./rivets_config')

var Backbone = require('backbone')
var $ = require('jquery')
Backbone.$ = $
var hub = require('widget').hub
window.hub = hub

// keep the hacky comment block below.. Browserify will embed all 
// disconnected widget scripts here:

// require all widgets

var vm = {
  site: {
    title: 'Multi Site POC'
  },
  toHome: function() {
    hub.trigger('enable:page', 'home')
    router.navigate('/')
  },
  toAbout: function() {
    hub.trigger('enable:page', 'about')
    router.navigate('/about')
  },
  toEvents: function() {
    hub.trigger('enable:page', 'events')
    router.navigate('/events')
  },
  toArticle: function(article) {
    hub.trigger('enable:page', 'article')
    router.navigate('/articles/' + article.get('slug'))
  },
  showLogin: function() {
    hub.trigger('modal:login')
  },
  showRegister: function() {
    hub.trigger('modal:register')
  },
  user: new Backbone.Model,
  logout: function() {
    hub.trigger('user:logout')
  }
}

hub.on('article:selected', vm.toArticle)

hub.trigger('user:check')
hub.on('user:login:error', function() {
  vm.user.set('loggedIn', false)
})
hub.on('user:loggedIn', function() {
  vm.user.set('loggedIn', true)
})

rivets.bind(document.getElementById('app'), vm)

var router = new Backbone.Router
router.route('', 'home', vm.toHome)
router.route('/events', 'events', vm.toEvents)
router.route('/about', 'about', vm.toAbout)
Backbone.history.start({ pushState: true })


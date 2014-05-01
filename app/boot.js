
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
    hub.trigger('enable:page', 'article', article)
  }
}

hub.on('selectArticle', function(article) {
  vm.toArticle(article)
  router.navigate('/articles/' + article.get('slug'))
})

rivets.bind(document.getElementById('app'), vm)

var router = new Backbone.Router
router.route('', 'home', vm.toHome)
router.route('/events', 'events', vm.toEvents)
router.route('/about', 'about', vm.toAbout)
Backbone.history.start({ pushState: true })


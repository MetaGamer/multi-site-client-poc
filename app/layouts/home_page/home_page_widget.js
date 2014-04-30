
var asWidget = require('widget')
var $ = require('jquery')

module.exports = asWidget('home-page', function(hub) {
  var widget = this

  widget
    .template('/layouts/home_page/home_page.html')
    .on('installed', function() {
      $.get('http://secularstates.wpengine.com/wp-json/posts', function(posts) {
        widget.set('posts', posts.map(function(post) { return function() { return list_item({ post: post }) } }))
      })
    })

   hub.on('enable:page', function(name) {
   	 (name === 'home') ? widget.start() : widget.stop()
   })
})

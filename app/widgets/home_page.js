
var asWidget = require('widget')
var $ = require('jquery')

module.exports = asWidget(function(hub) {
  var widget = this

  widget
    .template('/pages/home/home-page.html')
    .on('installed', function() {
      $.get('http://secularstates.wpengine.com/wp-json/posts', function(posts) {
        widget.set('posts', posts)
      })
    })

   hub.on('enable:page', function(name) {
   	 if (name === 'home') widget.start()
   })
})

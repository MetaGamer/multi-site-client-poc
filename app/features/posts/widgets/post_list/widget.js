
var asWidget = require('widget')
var $ = require('jquery')

module.exports = asWidget('post-list', function(hub) {
  var widget = this

  widget
    .template('/features/posts/widgets/post_list/template.html')
    .on('installed', function() {
      $.get('http://secularstates.wpengine.com/wp-json/posts', function(posts) {
        widget.set('posts', posts)
      })
      widget.start()
    })
})

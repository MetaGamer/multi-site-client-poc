
var asWidget = require('widget')
var posts = require('../../data')
var $ = require('jquery')

module.exports = asWidget('post-list', function(hub) {
  var widget = this

  widget
    .template('/features/posts/widgets/post_list/template.html')
    .on('installed', function() {
      posts.ensure()
      widget.start()
    })

  hub.on('posts:loaded', function(data) {
    widget.set('posts', data)
  })
})

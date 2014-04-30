
var asWidget = require('widget')
var posts = require('../../data')
var $ = require('jquery')

module.exports = asWidget('post-list', function(hub) {
  var widget = this

  widget
    .template('/features/posts/widgets/post_list/template.html')
    .on('installed', function() {
      posts.fetch().then(widget.set.bind(widget, 'posts'))
      widget.start()
    })
})

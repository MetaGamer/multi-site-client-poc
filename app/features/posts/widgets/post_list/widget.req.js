
var asWidget = require('widget')

module.exports = asWidget('post-list', function(hub) {
  var widget = this

  widget
    .template('/features/posts/widgets/post_list/template.html')
    .on('installed', function() {
      hub.trigger('posts:needed')
      widget.start()
    })

  widget.selectArticle = function(_, _, binding) {
    // yuck.
    var post = binding.view.models.post
    hub.trigger('article:selected', post)
  }

  hub.on('posts:loaded', function(data) {
    widget.set('posts', data)
  })
})

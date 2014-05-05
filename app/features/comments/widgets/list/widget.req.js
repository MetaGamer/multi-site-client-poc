
var asWidget = require('widget')

module.exports = asWidget('comment-list', function(hub) {
  var widget = this

  widget.template('/features/comments/widgets/list/template.html')

  widget.on('installed', function() {
    widget.start()
  })

  widget.comment = function() {
    var newComment = widget.get('newComment')
    if (newComment) {
      hub.trigger('saveComment', newComment)
    }
  }

  hub.on('comments', function(comments) {
    widget.set('comments', comments)
  })
})

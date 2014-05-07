
var asWidget = require('widget')

module.exports = asWidget('article-page', function(hub) {
  var widget = this

  widget.template('/features/pages/article/template.html')

  hub.on('enable:page', function(name) {
   	(name === 'article') ? widget.start() : widget.stop()
  })

  hub.on('article:selected', function(article) {
    widget.set('post', article)
    if (article.get('comments')) {
      hub.trigger('comments', article.get('comments'))
    } else {
      article.on('change:comments', function() {
        hub.trigger('comments', article.get('comments'))
      })
    }
  })
})

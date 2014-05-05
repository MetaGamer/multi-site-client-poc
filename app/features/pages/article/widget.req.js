
var asWidget = require('widget')

module.exports = asWidget('article-page', function(hub) {
  var widget = this

  widget.template('/features/pages/article/template.html')

  hub.on('enable:page', function(name) {
   	(name === 'article') ? widget.start() : widget.stop()
  })

  hub.on('article:selected', function(article) {
    widget.set('post', article)
    hub.trigger('comments', article.get('comments'))
  })
})

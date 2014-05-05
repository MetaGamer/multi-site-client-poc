
var asWidget = require('widget')

module.exports = asWidget('article-page', function(hub) {
  var widget = this

  widget.template('/layouts/article_page/template.html')

  hub.on('enable:page', function(name) {
   	(name === 'article') ? widget.start() : widget.stop()
  })

  hub.on('article:selected', function(article) {
    widget.set('post', article)
  })
})


var asWidget = require('widget')

module.exports = asWidget('article-page', function(hub) {
  var widget = this

  widget.template('/layouts/article_page/template.html')

  hub.on('enable:page', function(name, article) {
    if (name === 'article') {
      widget.start()
      widget.set('post', article)
    } else {
      widget.stop()
    }
  })
})


var asWidget = require('../util/widget')
var $ = require('jquery')

module.exports = asWidget(function(hub) {
  var widget = this

  widget
    .template('/modules/common/templates/home-page.html')
    .on('installed', function() {
      $.get('http://secularstates.wpengine.com/wp-json/posts', function(posts) {
        widget.set('posts', posts)
      })
    })
})


var asWidget = require('widget')

module.exports = asWidget('home-page', function(hub) {
  var widget = this

  widget.template('/features/pages/home/template.html')

  hub.on('enable:page', function(name) {
    (name === 'home') ? widget.start() : widget.stop()
  })

  
})

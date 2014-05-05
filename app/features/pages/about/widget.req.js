
var asWidget = require('widget')

module.exports = asWidget('about-page', function(hub) {
  var widget = this

  widget.template('/features/pages/about/template.html')

   hub.on('enable:page', function(name) {
   	 (name === 'about') ? widget.start() : widget.stop()
   })
})


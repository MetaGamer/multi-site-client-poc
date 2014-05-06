
var asWidget = require('widget')

module.exports = asWidget('event-page', function(hub) {
  var widget = this

  widget.template('/features/pages/event/template.html')

  hub.on('enable:page', function(name) {
   	(name === 'event') ? widget.start() : widget.stop()
  })

  hub.on('event:selected', function(event) {
    widget.set('event', event)
  })
})

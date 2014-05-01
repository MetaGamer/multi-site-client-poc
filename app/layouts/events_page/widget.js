
var asWidget = require('widget')
var events = require('../../features/events/data')

module.exports = asWidget('events-page', function(hub) {
  var widget = this

  widget
    .template('/layouts/events_page/template.html')
    .on('installed', function() {
      if (!widget.get('events')) {
        events.ensure()
      }
    })

  hub.on('enable:page', function(name) {
    name == 'events' ? widget.start() : widget.stop()
  })

  hub.on('events:loaded', function(events) {
    widget.set('events', events)
  })
})

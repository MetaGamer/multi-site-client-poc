
var asWidget = require('widget')

module.exports = asWidget('events-page', function(hub) {
  var widget = this

  widget
    .template('/features/pages/events/template.html')
    .on('installed', function() {
      if (!widget.get('events')) {
        hub.trigger('events:needed')
      }
    })

  hub.on('enable:page', function(name) {
    name == 'events' ? widget.start() : widget.stop()
  })

  widget.selectEvent = function(_, _, binding) {
    // yuck.
    var post = binding.view.models.event
    hub.trigger('event:selected', post)
  }

  hub.on('events:loaded', function(events) {
    widget.set('events', events)
  })
})

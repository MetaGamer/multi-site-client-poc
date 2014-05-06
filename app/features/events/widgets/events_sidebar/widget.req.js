
var asWidget = require('widget')
var _ = require('lodash')

module.exports = asWidget('events-sidebar', function(hub) {
  var widget = this
  
  widget
    .template('/features/events/widgets/events_sidebar/template.html')
    .on('installed', function() {
      hub.trigger('events:needed')
      widget.start()
    })

    widget.selectEvent = function(_, _, binding) {
    // yuck.
    var post = binding.view.models.event
    hub.trigger('event:selected', post)
  }


  hub.on('events:loaded', function(arr) {
    widget.set('events', arr.map(function(e) { return _.extend(e, { venue: e.terms.venue[0].name }) }))
  })
})

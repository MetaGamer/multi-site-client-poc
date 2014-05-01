
var asWidget = require('widget')
var _ = require('lodash')
var $ = require('jquery')
var events = require('../../data')

module.exports = asWidget('events-sidebar', function(hub) {
  var widget = this
  
  widget
    .template('/features/events/widgets/events_sidebar/template.html')
    .on('installed', function() {
      if (!widget.get('events')) {
        events.ensure()
      }
      widget.start()
    })

  hub.on('events:loaded', function(arr) {
    widget.set('events', arr.map(function(e) { return _.extend(e, { venue: e.terms.venue[0].name }) }))
  })
})

var asWidget = require('widget')
var _ = require('lodash')

module.exports = asWidget('groups-sidebar', function(hub) {
  var widget = this
  
  widget
    .template('/features/groups/widgets/nearby_groups/template.html')
    .on('installed', function() {
      hub.trigger('groups:needed')
      widget.start()
    })

  hub.on('groups:loaded', function(arr) {
    widget.set('groups', arr)
  })
})

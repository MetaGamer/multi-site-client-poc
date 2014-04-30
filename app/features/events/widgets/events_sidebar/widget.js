
var asWidget = require('widget')

module.exports = asWidget('events-sidebar', function(hub) {
  var widget = this
  
  widget
    .template('/features/events/widgets/events_sidebar/template.html')
    .start()
})

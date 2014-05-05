
var asWidget = require('widget')

module.exports = asWidget('register-modal', function(hub) {
  var widget = this

  widget.template('/features/users/widgets/register_modal/template.html')

  widget.on('installed', function() {
    widget.start().hide()
  })

  hub.on('modal:register', widget.show, widget)
})

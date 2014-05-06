
var asWidget = require('widget')
var Backbone = require('backbone')

module.exports = asWidget('register-modal', function(hub) {
  var widget = this

  widget.user = new Backbone.Model

  widget.template('/features/users/widgets/register_modal/template.html')

  widget.on('installed', function() {
    widget.start().hide()
  })

  widget.register = function() {
    hub.trigger('user:register', widget.user)
  }

  hub.on('user:loggedIn', function() {
    widget.hide()
  })

  hub.on('modal:register', widget.show, widget)
})

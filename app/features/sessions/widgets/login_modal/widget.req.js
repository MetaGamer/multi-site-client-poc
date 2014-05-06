
var asWidget = require('widget')
var Backbone = require('backbone')

module.exports = asWidget('login-modal', function(hub) {
  var widget = this

  var user = new Backbone.Model({ email: '', password: '' })
  widget.user = user

  widget.template('/features/sessions/widgets/login_modal/template.html')

  widget.on('installed', function() {
    widget.start().hide()
  })

  widget.login = function() {
    hub.trigger('user:login', user)
  }

  hub.on('user:loggedIn', function(user) {
    widget.hide()
  })

  hub.on('user:login:error', function(e) {
  })

  hub.on('modal:login', widget.show, widget)
})

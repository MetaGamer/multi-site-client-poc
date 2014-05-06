
var $ = require('jquery')

var user = {

  register: function(user) {
    $.ajax({
      url: 'http://ca.secularstates.wpengine.com/wp-json/users',
      type: 'POST',
      data: { data: { username: user.get('name'), email: user.get('email'), password: user.get('password') } },
      success: function() {
        hub.trigger('user:loggedIn')
      }
    })
  }
}

hub.on('user:register', user.register, user)

module.exports = user

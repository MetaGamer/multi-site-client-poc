
var $ = require('jquery')
var hub = require('widget').hub

var session = {

  check: function() {
    $.get('http://secularstates.wpengine.com/wp-json/session')
      .success(function(user) {
        hub.trigger('user:loggedIn')
      })
      .error(function(e) {
        hub.trigger('user:login:error')
      })
  },
  
  create: function(email, password) {
    $.post('http://secularstates.wpengine.com/wp-json/session', { 
      creds: {
        user: email,
        password: password
      }
    }).success(function(user) {
      hub.trigger('user:loggedIn', user)
    }).error(function(e) {
      hub.trigger('user:login:failed', e)
    })
  },

  destroy: function() {
    $.ajax({
      type: 'DELETE',
      url: 'http://secularstates.wpengine.com/wp-json/session',
      xhrFields: {
        withCredentials: true
      }
    })
  }
}

hub.on('user:login', function(user) {
  session.create(user.get('email'), user.get('password'))
})

hub.on('user:logout', session.destroy, session)
hub.on('user:check', session.check, session)

module.exports = session

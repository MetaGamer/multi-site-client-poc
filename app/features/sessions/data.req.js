
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
      hub.trigger('user:login:error', e)
    })
  },

  destroy: function() {
    $.ajax({
      type: 'DELETE',
      url: 'http://secularstates.wpengine.com/wp-json/session',
      xhrFields: {
        withCredentials: true
      }
    }).success(function() {
      hub.trigger('user:login:error')
    })
  }
}

hub.on('user:login', function(user) {
  session.create(user.get('email'), user.get('password'))
})

hub.on('user:logout', session.destroy, session)
hub.on('user:check', session.check, session)

module.exports = session

//==========================================================================//
// This file is part of multi-site-client-poc.                              //
//                                                                          //
// multi-site-client-poc is Copyright 2014 Volary Foundation and            //
// Contributors                                                             //
//                                                                          //
// multi-site-client-poc is free software: you can redistribute it and/or   //
// modify it under the terms of the GNU Affero General Public License as    //
// published by the Free Software Foundation, either version 3 of the       //
// License, or at your option) any later version.                           //
//                                                                          //
// multi-site-client-poc is distributed in the hope that it will be useful, //
// but WITHOUT ANY WARRANTY; without even the implied warranty of           //
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero  //
// General Public License for more details.                                 //
//                                                                          //
// You should have received a copy of the GNU Affero General Public         //
// License along with multi-site-client-poc.  If not, see                   //
// <http://www.gnu.org/licenses/>.                                          //
//==========================================================================//


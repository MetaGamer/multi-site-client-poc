
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


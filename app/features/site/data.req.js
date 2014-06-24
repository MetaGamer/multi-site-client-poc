
var rsvp = require('rsvp')
var $ = require('jquery')
var Backbone = require('backbone')
var hub = require('widget').hub

var cache
function broadcast() {
  hub.trigger('site:loaded', cache)
}

var Site = Backbone.Model.extend({ })

var site = {

  fetch: function() {
    return new rsvp.Promise(function(res, rej) {
      $.get('http://secularstates.wpengine.com/wp-json/', function(site) {
        cache = site
        broadcast()
      })
    })
  },

  ensure: function() {
    if (cache) broadcast()
    else this.fetch()
  }
}

hub.on('site:needed', site.ensure, site) 

module.exports = site

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




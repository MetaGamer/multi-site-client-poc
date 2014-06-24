
var $ = require('jquery')
var hub = require('widget').hub

var cache
function broadcast() {
  hub.trigger('events:loaded', cache)
}

var events = {

  fetch: function() {
    $.get('http://secularstates.wpengine.com/wp-json/posts?type=events', function(events) {
      cache = events
      broadcast()
    })
  },

  ensure: function() {
    if (cache) broadcast()
    else this.fetch()
  },

  bySlug: function(slug, cb) {
    $.get('http://secularstates.wpengine.com/wp-json/posts?type=events&filter[name]=' + slug, function(events) {
      if (events && events[0]) cb(events[0])    
    })
  }
}

hub.on('events:needed', events.ensure, events)
hub.on('event:fromSlug', events.bySlug, events)

module.exports = events

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


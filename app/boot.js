
var rivets = require('rivets')
require('./rivets_config')

var Backbone = require('backbone')
var $ = require('jquery')
Backbone.$ = $
var hub = require('widget').hub
var _ = require('lodash')
window.hub = hub

$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true
})

// keep the hacky comment block below.. Browserify will embed all 
// disconnected widget scripts here:

// require all widgets

var View = Backbone.Model.extend({
  toggleMenu: function() {
    this.set('menuIn', !this.get('menuIn'))
  },
})

var vm = {
  view: new View({ menuIn: false }),
  toHome: function() {
    hub.trigger('enable:page', 'home')
    router.navigate('#/')
  },
  toAbout: function() {
    hub.trigger('enable:page', 'about')
    router.navigate('#/about')
  },
  toEvents: function() {
    hub.trigger('enable:page', 'events')
    router.navigate('#/events')
  },
   toEvent: function(event) {
    hub.trigger('enable:page', 'event')
    router.navigate('#/events/' + event['slug'])
  },
  toArticle: function(article) {
    hub.trigger('enable:page', 'article')
    router.navigate('#/articles/' + article.get('slug'))
  },
  showLogin: function() {
    hub.trigger('modal:login')
  },
  showRegister: function() {
    hub.trigger('modal:register')
  },
  user: new Backbone.Model,
  logout: function() {
    hub.trigger('user:logout')
  },
  site: new Backbone.Model
}

hub.on('article:selected', vm.toArticle)
hub.on('event:selected', vm.toEvent)

vm.user.set('loading', true)

hub.trigger('site:needed')

hub.on('site:loaded', function(site) {
  vm.site.set(site)
  document.getElementById('style').innerText = '.featured-color {color: ' + site.group_data.color + '}' + '.featured-bg-color {background: ' + site.group_data.color + '}' + '.featured-border-color {border-color: ' + site.group_data.color + '}'

})

hub.trigger('user:check')

hub.on('user:login:error', function() {
  vm.user.set('loggedIn', false)
  vm.user.set('loading', false)
})
hub.on('user:loggedIn', function() {
  vm.user.set('loggedIn', true)
  vm.user.set('loading', false)
})

rivets.bind(document.getElementById('app'), vm)

var router = new Backbone.Router
router.route('', 'home', vm.toHome)
router.route('events', 'events', vm.toEvents)
router.route('events/:slug', 'event', function(slug) {
  hub.trigger('event:fromSlug', slug, hub.trigger.bind(hub, 'event:selected'))
})
router.route('articles/:slug', 'event', function(slug) {
  hub.trigger('post:fromSlug', slug, hub.trigger.bind(hub, 'article:selected'))
})
router.route('about', 'about', vm.toAbout)
Backbone.history.start()

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


var rsvp = require('rsvp')
var $ = require('jquery')
var Backbone = require('backbone')
var hub = require('widget').hub
var _ = require('lodash')

var cache
function broadcast() {
  hub.trigger('posts:loaded', cache)
}

var Post = Backbone.Model.extend({ })

function buildPost(post) {
  $.get(post.get('meta').links.replies, function(comments) {
    post.set('comments', comments)
  })
  return post
}

var posts = {

  fetch: function() {
    return new rsvp.Promise(function(res, rej) {
      $.get('http://secularstates.wpengine.com/wp-json/posts', function(posts) {
        var postModels = posts.map(function(p) { return new Post(p) })
        cache = postModels
        broadcast()
        postModels.forEach(buildPost)
      })
    })
  },

  ensure: function() {
    if (cache) broadcast()
    else this.fetch()
  },

  fromSlug: function(slug, cb) {
    if (cache) {
      var found = _.find(cache, function(post) { return post.get('slug') == slug })
      if (found) cb(found)
    } else {
      $.get('http://secularstates.wpengine.com/wp-json/posts?filter[name]=' + slug, function(posts) {
        if (posts && posts[0]) cb(buildPost(new Post(posts[0])))
      })
    }
  },

  addComment: function(post, data) {
    $.post('http://secularstates.wpengine.com/wp-json/posts/' + post.get('ID') + '/comments', {
      data: {
        comment_content: data.content
      }
    })
  }
}

hub.on('posts:needed', posts.ensure, posts) 
hub.on('post:fromSlug', posts.fromSlug, posts)
hub.on('post:addComment', posts.addComment, posts)

module.exports = posts

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


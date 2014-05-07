
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



var rsvp = require('rsvp')
var $ = require('jquery')
var Backbone = require('backbone')
var hub = require('widget').hub

var cache
function broadcast() {
  hub.trigger('posts:loaded', cache)
}

var Post = Backbone.Model.extend({ })

var posts = {

  fetch: function() {
    return new rsvp.Promise(function(res, rej) {
      $.get('http://secularstates.wpengine.com/wp-json/posts', function(posts) {
        var postModels = posts.map(function(p) { return new Post(p) })
        cache = postModels
        broadcast()
        postModels.forEach(function(post) {
          $.get(post.get('meta').links.replies, function(comments) {
            post.set('comments', comments)
          })
        })
      })
    })
  },

  ensure: function() {
    if (cache) broadcast()
    else this.fetch()
  }
}

hub.on('posts:needed', posts.ensure, posts) 

module.exports = posts


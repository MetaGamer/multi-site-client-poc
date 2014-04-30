
var rsvp = require('rsvp')

module.exports = {

  fetch: function() {
    return new rsvp.Promise(function(res, rej) {
      $.get('http://secularstates.wpengine.com/wp-json/posts', function(posts) {
        res(posts)
      })
    })
  }
}
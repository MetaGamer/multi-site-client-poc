
var comments = {

  create: function(post, newComment) {
    
  }
}

var post;
hub.on('article:selected', function(article) {
  post = article
})

hub.on('saveComment', function(newComment) {
  if (!post) return
  comments.create(post, newComment)
})

module.exports = comments

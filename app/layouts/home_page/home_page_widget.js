
var asWidget = require('widget')
var $ = require('jquery')

module.exports = asWidget('home-page', function(hub) {
  var widget = this

  widget.template('/layouts/home_page/home_page.html')

   hub.on('enable:page', function(name) {
   	 (name === 'home') ? widget.start() : widget.stop()
   })
})

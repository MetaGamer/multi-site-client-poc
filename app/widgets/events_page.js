
var widget = require('../util/widget')

module.exports = widget(function () {
  this.unique('page', 'events')
  this.template('/modules/common/templates/events-page.html')
})


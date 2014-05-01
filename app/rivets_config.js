var rivets = require('rivets')
var _ = require('lodash')
var moment = require('moment')

rivets.adapters['.'] = {
  subscribe: function(obj, keypath, callback) { },
  unsubscribe: function(obj, keypath, callback) { },
  read: function(obj, keypath) {
    return obj[keypath]
  },
  publish: function(obj, keypath, value) {
    obj[keypath] = value
    return obj
  }
}

rivets.adapters[':'] = {
  subscribe: function(obj, keypath, callback) {
    obj.on('change:' + keypath, callback)
  },
  unsubscribe: function(obj, keypath, callback) {
    obj.off('change:' + keypath, callback)
  },
  read: function(obj, keypath) {
    return obj.get(keypath)
  },
  publish: function(obj, keypath, value) {
    obj.set(keypath, value)
  }
}

rivets.formatters.maybe = function(obj, key) {
  if (obj) {
    return obj[key]
  }
}

rivets.formatters.prefix = function(a, b) {
  return b + '' + a
}

rivets.formatters.prettyDate = function(date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a')
}

rivets.formatters.justDate = function(date) {
  return moment(date).format('D')
}

rivets.formatters.justMonth = function(date) {
  return moment(date).format('MMMM')
}

rivets.formatters.eventTime = function(event) {
  var txt = moment(event.date).format('dddd, MMMM Do, ')
  var hasTime = event.post_meta.fc_start_datetime
  if (hasTime) {
    txt += moment(event.post_meta.fc_start_datetime[0]).format('h:mmA - ')
    txt += moment(event.post_meta.fc_end_datetime[0]).format('h:mmA')
  }
  return txt
}

rivets.formatters.last = function(arr) {
  return _.last(arr)
}

rivets.formatters.models = function(coll) {
  return coll.models
}

rivets.formatters.get = function(model, key) {
  return model.get(key)
}

rivets.formatters.invert = function(a) {
  return !a
}

rivets.formatters.ternary = function(cond, a, b) {
  return cond ? a : b
}

rivets.formatters.eql = function(a, b) {
  return a == b
}

rivets.formatters.confirm = function(fn) {
  var words = [].slice.call(arguments, 1)
  return function() {
    var args = arguments
    var self = this
    var answer = confirm(words.join(' '))
    if (answer) fn.apply(self, arguments)
  }
}

rivets.formatters.count = function(arr) {
  return (arr) ? (arr.length || 0) : 0
}

rivets.formatters.default = function(a, b) {
  return a || b
}

rivets.formatters.preventDefault = function(fn) {
  return function(e) {
    e.preventDefault()
    fn.apply(this, arguments)
  }
}

rivets.configure({
  handler: function(target, event, binding) {
    this.call(binding.model, event, target, binding)
  }
})

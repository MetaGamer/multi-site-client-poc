
var vol = _.extend({}, Backbone.Events)

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

rivets.binders['widget-enabled'] = function(el, val) {
  debugger 
}

rivets.binders['widget'] = {

  'function': true,

  bind: function(el) {
    if (this.marker) return

    this.marker = document.createComment('rivets: widget')
   
    var attr = [ this.view.config.prefix, this.type ].join('-').replace('--', '-')
    el.removeAttribute(attr)

    el.parentNode.insertBefore(this.marker, el)

    el.setAttribute('rv-show', 'widget:visible')
    el.setAttribute('rv-class-loading', 'widget:loading')
  },

  unbind: function(el) {
    el.parentNode.removeChild(el)
    if (this.widget.view) this.widget.view.unbind()
    this.widget.uninstall()
  },

  routine: function(el, widgetFactory) {
    var widget = widgetFactory()
    if (this.widget) return

    widget.on('change:enabled', function() {
      if (!widget.get('enabled')) return this.unbind(el)

      widget.ensureFragment(function(frag) {
        el.innerHTML = ''
        el.appendChild(frag.cloneNode(true))

        var models = _.extend({}, this.view.models, { widget: widget })
        var options = {
          binders: this.view.binders,
          formatters: this.view.formatters,
          adapters: this.view.adapters,
          config: this.view.config
        }

        widget.view = rivets.bind(el, models, options)
        this.marker.parentNode.insertBefore(el, this.marker.nextSibling)
      }.bind(this))
    }, this)

    this.widget = widget
    widget.install(el)
  }
}



;(function() {

  function argsAsArray(args) {
    return _.flatten(_.toArray(args))
  }

  function fluent(fn) {
    return function() {
      fn.apply(this, arguments)
      return this
    }
  }
 
  window.Widget = Backbone.Model.extend({

    _createFragment: function() {
      var child
      var frag = document.createDocumentFragment()
      var tmp = document.createElement('body')
      tmp.innerHTML = this.get('html')
      while (child = tmp.firstChild) frag.appendChild(child)
      this.set('fragment', frag)
    },

    ensureFragment: function(cb) {
      var frag = this.get('fragment')
      if (frag) return cb(frag)
      this.once('change:fragment', function() {
        cb(this.get('fragment'))
      }, this)
    },

    constructor: function() {
      this.styleTags = []
      this.on('change:html', this._createFragment, this)
      Backbone.Model.prototype.constructor.apply(this, arguments)
    },
   
    install: function(el) {
      this.set('el', el)
      // try to get bootstrapped HTML
      if (el.childNodes.length) this.set('html', el.innerHTML)
      this.trigger('installed')
    },

    uninstall: function() {
      function remove(el) { el.parentNode.removeChild(el) }
      this.styleTags.forEach(remove)
      this.unset('el')
      this.trigger('uninstalled')
    },

    template: fluent(function(url) {
      $.ajax({
        type: 'GET',
        accept: 'text/html',
        url: url,
        success: this.set.bind(this, 'html')
      })
    }),

    css: fluent(function() {
      var urls = _.filter(argsAsArray(arguments), notAlreadyLoaded)
      var head = document.getElementsByTagName('head')[0]
      var links = urls.map(function(url) {
        var link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', url)
        head.appendChild(link)
        return link
      })
      this.styleTags.apply(this, links)
    }),

    js: fluent(function() {
      var urls = _.filter(argsAsArray(arguments), notAlreadyLoaded)
      var head = document.getElementsByTagName('head')[0]
      urls.forEach(function(url) {
        var script = document.createElement('script')
        script.setAttribute('src', url)
        head.appendChild(script)
      })
    }),

    unique: function(key, val) {
      vol.on('enable:' + key, function(name) {
        name == val ? this.enable().show() : this.disable()
      }, this)
    },

    enable: fluent(function() {
      this.set('enabled', true)
    }),

    disable: fluent(function() {
      this.set('enabled', false)
    }),

    show: fluent(function() {
      this.set('visible', true)
    }),

    hide: fluent(function() {
      this.set('visible', false)
    }),

    loading: fluent(function() {
      this.set('loading', true)
    }),

    loaded: fluent(function() {
      this.set('loading', false)
    })
  })
})()

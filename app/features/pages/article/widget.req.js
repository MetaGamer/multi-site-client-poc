
var asWidget = require('widget')

module.exports = asWidget('article-page', function(hub) {
  var widget = this

  widget.template('/features/pages/article/template.html')

  hub.on('enable:page', function(name) {
   	(name === 'article') ? widget.start() : widget.stop()
  })

  hub.on('article:selected', function(article) {
    widget.set('post', article)
    if (article.get('comments')) {
      hub.trigger('comments', article.get('comments'))
    } else {
      article.on('change:comments', function() {
        hub.trigger('comments', article.get('comments'))
      })
    }
  })
})

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

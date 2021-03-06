var $ = require('jquery')
var hub = require('widget').hub

var cache
function broadcast() {
  hub.trigger('groups:loaded', cache)
}

var getStateAbbrviation = function(state) {
  switch(state.toUpperCase()) {
    case "ALABAMA":
      return 'AL'
      break;
    case "ALASKA":	
      return 'AK'
      break;
    case "AMERICAN SAMOA":
      return 'AS'
      break;
    case "ARIZONA":
      return 'AZ'
      break;
    case "ARKANSAS":
      return 'AR'
      break;
    case "CALIFORNIA":
      return 'CA'
      break;
    case "COLORADO":
      return 'CO'
      break;
    case "CONNECTICUT":
      return 'CT'
      break;
    case "DELAWARE":
      return 'DE'
      break;
    case "DISTRICT OF COLUMBIA":
      return 'DC'
      break;
    case "FEDERATED STATES OF MICRONESIA":
      return 'FM'
      break;
    case "FLORIDA":
      return 'FL'
      break;
    case "GEORGIA":
      return 'GA'
      break;
    case "GUAM GU":
      return 'GU'
      break;
    case "HAWAII":
      return 'HI'
      break;
    case "IDAHO":
      return 'ID'
      break;
    case "ILLINOIS":
      return 'IL'
      break;
    case "INDIANA":
      return 'IN'
      break;
    case "IOWA":
      return 'IA'
      break;
    case "KANSAS":
      return 'KS'
      break;
    case "KENTUCKY":
      return 'KY'
      break;
    case "LOUISIANA":
      return 'LA'
      break;
    case "MAINE":
      return 'ME'
      break;
    case "MARSHALL ISLANDS":
      return 'MH'
      break;
    case "MARYLAND":
      return 'MD'
      break;
    case "MASSACHUSETTS":
      return 'MA'
      break;
    case "MICHIGAN":
      return 'MI'
      break;
    case "MINNESOTA":
      return 'MN'
      break;
    case "MISSISSIPPI":
      return 'MS'
      break;
    case "MISSOURI":
      return 'MO'
      break;
    case "MONTANA":
      return 'MT'
      break;
    case "NEBRASKA":
      return 'NE'
      break;
    case "NEVADA":
      return 'NV'
      break;
    case "NEW HAMPSHIRE":
      return 'NH'
      break;
    case "NEW JERSEY":
      return 'NJ'
      break;
    case "NEW MEXICO":
      return 'NM'
      break;
    case "NEW YORK":
      return 'NY'
      break;
    case "NORTH CAROLINA":
      return 'NC'
      break;
    case "NORTH DAKOTA":
      return 'ND'
      break;
    case "NORTHERN MARIANA ISLANDS":
      return 'MP'
      break;
    case "OHIO":
      return 'OH'
      break;
    case "OKLAHOMA":
      return 'OK'
      break;
    case "OREGON":
      return 'OR'
      break;
    case "PALAU":
      return 'PW'
      break;
    case "PENNSYLVANIA":
      return 'PA'
      break;
    case "PUERTO RICO":
      return 'PR'
      break;
    case "RHODE ISLAND":
      return 'RI'
      break;
    case "SOUTH CAROLINA":
      return 'SC'
      break;
    case "SOUTH DAKOTA":
      return 'SD'
      break;
    case "TENNESSEE":
      return 'TN'
      break;
    case "TEXAS":
      return 'TX'
      break;
    case "UTAH":
      return 'UT'
      break;
    case "VERMONT":
      return 'VT'
      break;
    case "VIRGIN ISLANDS":
      return 'VI'
      break;
    case "VIRGINIA":
      return 'VA'
      break;
    case "WASHINGTON":
      return 'WA'
      break;
    case "WEST VIRGINIA":
      return 'WV'
    case "WISCONSIN":
      return 'WI'
      break;
    case "WYOMING":
      return 'WY'
      break;
    default:
      return 'CO'
      break;
  }
}

var groups = {

  fetch: function() {
    $.get("http://ipinfo.io", function(response) {
      console.log(response.loc)
      geo = response.loc.split(',')
      var request = $.ajax({url: 'http://api.secularconnect.org/cache?type=group&limit=5&q[geo][]=' + geo[1] + '&q[geo][]=' + geo[0]  + '&q[geo][]=40233.6', xhrFields: { withCredentials: false }})
      request.then(function(groups) {
        cache = groups
        broadcast()
      })
    }, "jsonp");
  },

  ensure: function() {
    if (cache) broadcast()
    else this.fetch()
  }
}

hub.on('groups:needed', groups.ensure, groups)

module.exports = groups

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


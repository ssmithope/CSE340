//const invModel = require("../models/inventory-model")
//const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
//Util.getNav = async function (req, res, next) {
//  let data = await invModel.getClassifications()
//  let list = "<ul>"
//  list += '<li><a href="/" title="Home page">Home</a></li>'
//  data.rows.forEach((row) => {
//    list += "<li>"
//    list +=
//      '<a href="/inv/type/' +
//      row.classification_id +
//      '" title="See our inventory of ' +
//      row.classification_name +
//      ' vehicles">' +
//      row.classification_name +
//      "</a>"
//    list += "</li>"
//  })
//  list += "</ul>"
//  return list
//}


/* **************************************
* Build the classification view HTML
* ************************************ */
//Util.buildClassificationGrid = async function(data){
//    let grid
//    if(data.length > 0){
//      grid = '<ul id="inv-display">'
//      data.forEach(vehicle => { 
//        grid += '<li>'
//        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
//        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
//        + 'details"><img src="' + vehicle.inv_thumbnail 
//        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
//        +' on CSE Motors" /></a>'
//        grid += '<div class="namePrice">'
//        grid += '<hr />'
//        grid += '<h2>'
//        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
//        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
//        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
//        grid += '</h2>'
//        grid += '<span>$' 
//        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
//        grid += '</div>'
//        grid += '</li>'
//      })
//      grid += '</ul>'
//    } else { 
//      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
//   }
//    return grid
//}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
//Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

//module.exports = Util


//exports.wrapVehicleDataInHTML = (vehicle) => {
//    return `
//        <!DOCTYPE html>
//        <html lang="en-US">
//        <head>
//            <meta charset="UTF-8">
//            <meta name="viewport" content="width=device-width, initial-scale=1.0">
//            <title>${vehicle.year} ${vehicle.make} ${vehicle.model}</title>
//            <style>
//                body { font-family: Arial, sans-serif; }
//               .container { display: flex; flex-wrap: wrap; }
//                .image, .details { flex: 1; margin: 10px; }
//                .details { max-width: 500px; }
//            </style>
//        </head>
//        <body>
//            <h1>${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
//            <div class="container">
//                <div class="image">
//                    <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" style="max-width: 100%;">
//                </div>
//                <div class="details">
//                    <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
//                    <p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</p>
//                    <p><strong>Exterior Color:</strong> ${vehicle.ext_color}</p>
//                    <p><strong>Fuel Type:</strong> ${vehicle.fuel_type}</p>
//                </div>
//            </div>
//        </body>
//        </html>
//    `;
//};


export function wrapVehicleHTML(vehicle) {
    return `
        <div class="vehicle-detail">
            <img src="${vehicle.full_image}" alt="${vehicle.make} ${vehicle.model}">
            <h2>${vehicle.make} ${vehicle.model} (${vehicle.year})</h2>
            <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
            <p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</p>
            <p>${vehicle.description}</p>
        </div>
    `;
}

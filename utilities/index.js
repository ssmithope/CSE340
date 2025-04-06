const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


function wrapVehicleDetail(vehicle) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>${vehicle.make} ${vehicle.model}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .vehicle-container { display: flex; flex-wrap: wrap; }
                .vehicle-image { flex: 1; max-width: 50%; }
                .vehicle-details { flex: 1; max-width: 50%; padding: 20px; }
                @media (max-width: 768px) {
                    .vehicle-container { flex-direction: column; }
                    .vehicle-image, .vehicle-details { max-width: 100%; }
                }
            </style>
        </head>
        <body>
            <div class="vehicle-container">
                <img class="vehicle-image" src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" />
                <div class="vehicle-details">
                    <h1>${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
                    <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
                    <p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</p>
                    <p>${vehicle.description}</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

module.exports = { wrapVehicleDetail };


module.exports = Util
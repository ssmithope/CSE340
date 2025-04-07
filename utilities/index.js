const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function () {
    try {
      let data = await invModel.getClassifications();
      let nav = "<ul>";
      data.forEach((row) => {
        nav += `<li><a href="/inventory/classification/${row.classification_id}">${row.classification_id}</a></li>`;
      });
      nav += "</ul>";
      return nav;
    } catch (err) {
      throw new Error("Failed to build navigation: " + err.message);
    }
  };
  

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
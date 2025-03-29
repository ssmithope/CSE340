const fetchDataFromDatabase = async () => {
    return [
      { id: 1, name: "Cars" },
      { id: 2, name: "Trucks" },
      { id: 3, name: "SUVs" },
    ];
  };
  
  const getNav = async () => {
    try {
      const classifications = await fetchDataFromDatabase(); // Use mock data for testing
      return classifications
        .map(
          (classification) =>
            `<li><a href="/classification/${classification.id}">${classification.name}</a></li>`
        )
        .join("");
    } catch (error) {
      console.error("Error constructing navigation:", error.message);
      return '<ul><li><a href="/">Home</a></li></ul>'; // Fallback navigation
    }
  };
  
  module.exports = { getNav, fetchDataFromDatabase };
  
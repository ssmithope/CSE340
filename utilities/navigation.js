const getNav = async () => {
    try {
      const classifications = await fetchDataFromDatabase(); // Example function
      if (!classifications || classifications.length === 0) {
        throw new Error("No classifications found");
      }
      return classifications.map((classification) => ({
        label: classification.name,
        link: `/classification/${classification.id}`,
      }));
    } catch (error) {
      console.error("Error constructing navigation:", error.message);
      return [
        { label: "Home", link: "/" },
        { label: "Inventory", link: "/inv" },
        { label: "Contact Us", link: "/contact" },
      ]; // Fallback navigation
    }
  };
  
  module.exports = { getNav };
  
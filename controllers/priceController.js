import axios from "axios";
const getPrices = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
      {
        params: {
          "api-key": process.env.PRICE_API_KEY,
          format: "json",
          "filters[state]": "Gujarat",
          "filters[district]": "Anand",
        },
      }
    );
    res.json(response.data.records);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export { getPrices };

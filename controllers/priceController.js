import axios from "axios";
const getPrices = async (req, res) => {
  const pincode = req.params.pincode;
  const { district, state } = await getDistrictState(pincode);
  try {
    const response = await axios.get(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
      {
        params: {
          "api-key": process.env.PRICE_API_KEY,
          format: "json",
          "filters[state]": state,
          "filters[district]": district,
        },
      }
    );
    const records = { records: response.data.records };
    res.status(200).json(records);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getDistrictState = async (pincode) => {
  try {
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    const district = response.data[0].PostOffice[0].District;
    const state = response.data[0].PostOffice[0].State;
    return { district, state };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export { getPrices };

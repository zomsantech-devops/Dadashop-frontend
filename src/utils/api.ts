import axios from "axios";

export const getRate = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/setting/currency`
    );
    return response.data.data.rate;
  } catch (error) {
    console.error("Error fetching currency rate:", error);
    return null; // Or a default rate, depending on your needs
  }
};

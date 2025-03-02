const { onRequest } = require("firebase-functions/v2/https"); // No Firebase needed
const axios = require("axios");
require("dotenv").config();

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

// Function to detect query type
function detectQueryType(query) {
  if (query.includes("flight")) return "flight";
  if (query.includes("hotel")) return "hotel";
  if (query.includes("visit") || query.includes("places")) return "places";
  if (query.includes("itinerary") || query.includes("trip")) return "itinerary";
  return "unknown";
}

// Fetch flights
async function searchFlight() {
  try {
    const response = await axios.get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
      headers: { Authorization: `Bearer ${AMADEUS_API_KEY}` },
    });
    return response.data || "No flight data available.";
  } catch (error) {
    return "Error fetching flight details.";
  }
}

// Fetch hotels
async function searchHotel() {
  try {
    const response = await axios.get("https://test.api.amadeus.com/v2/shopping/hotel-offers", {
      headers: { Authorization: `Bearer ${AMADEUS_API_KEY}` },
    });
    return response.data || "No hotel data available.";
  } catch (error) {
    return "Error fetching hotel details.";
  }
}

// Fetch recommended places
function recommendPlaces() {
  return ["Taj Mahal", "Gateway of India", "Mysore Palace"];
}

// Generate itinerary
function generateItinerary(query) {
  if (query.includes("Goa")) {
    return "Day 1: Beaches & markets. Day 2: Old Goa churches. Day 3: Adventure & nightlife.";
  }
  return "Day 1: Explore city. Day 2: Visit attractions. Day 3: Enjoy local food.";
}

// Webhook handler
exports.mytravelwebhook = onRequest(async (req, res) => {
  const queryText = req.body.text?.toLowerCase() || "";
  const queryType = detectQueryType(queryText);
  let responseMessage = "I couldn't find what you're looking for.";

  try {
    if (queryType === "flight") responseMessage = await searchFlight();
    else if (queryType === "hotel") responseMessage = await searchHotel();
    else if (queryType === "places") responseMessage = recommendPlaces();
    else if (queryType === "itinerary") responseMessage = generateItinerary(queryText);
  } catch (error) {
    responseMessage = "Sorry, something went wrong.";
  }

  res.json({
    fulfillment_response: { messages: [{ text: { text: [responseMessage] } }] },
  });
});
 

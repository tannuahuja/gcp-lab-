const functions = require("firebase-functions");
const axios = require("axios");

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

// Detect User Query
function detectQueryType(query) {
  if (query.includes("flight")) return "flight";
  if (query.includes("hotel")) return "hotel";
  if (query.includes("visit") || query.includes("places")) return "places";
  if (query.includes("itinerary") || query.includes("trip")) return "itinerary";
  return "unknown";
}

// Fetch Flights
async function searchFlight() {
  const url = "https://test.api.amadeus.com/v2/shopping/flight-offers";
  const response = await axios.get(url, { headers: { Authorization: `Bearer ${AMADEUS_API_KEY}` } });
  return response.data;
}

// Fetch Hotels
async function searchHotel() {
  const url = "https://test.api.amadeus.com/v2/shopping/hotel-offers";
  const response = await axios.get(url, { headers: { Authorization: `Bearer ${AMADEUS_API_KEY}` } });
  return response.data;
}

// Recommended Places
async function recommendPlaces() {
  return ["Taj Mahal", "Gateway of India", "Mysore Palace"];
}

// Generate Itinerary
async function generateItinerary(destination, days) {
  return `Here is a suggested ${days}-day itinerary for ${destination}: Day 1: Explore city, Day 2: Visit attractions, Day 3: Enjoy local food.`;
}

// Webhook Entry
exports.mytravelwebhook = functions.https.onRequest(async (req, res) => {
  const params = req.body.sessionInfo.parameters;
  const queryText = req.body.text.toLowerCase();
  const queryType = detectQueryType(queryText);
  
  let responseMessage = "I couldn't find what you're looking for.";

  try {
    if (queryType === "flight") responseMessage = await searchFlight();
    else if (queryType === "hotel") responseMessage = await searchHotel();
    else if (queryType === "places") responseMessage = await recommendPlaces();
    else if (queryType === "itinerary") responseMessage = await generateItinerary(params.destination, params.trip_duration);
  } catch (error) {
    responseMessage = "Sorry, something went wrong.";
  }

  res.json({
    fulfillment_response: { messages: [{ text: { text: [responseMessage] } }] },
    sessionInfo: { parameters: { status: "final" } }
  });
});

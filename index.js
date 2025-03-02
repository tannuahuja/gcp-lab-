const { onRequest } = require("firebase-functions/v2/https");
const axios = require("axios");
require("dotenv").config();

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;

function detectQueryType(parameters) {
    if (parameters.to_city && parameters.from_city) return "flight";
    if (parameters.location) return "hotel";
    if (parameters.destination) return "itinerary";
    return "unknown";
}

async function searchFlight(from_city, to_city, date) {
    try {
        const response = await axios.get(`https://test.api.amadeus.com/v2/shopping/flight-offers?origin=${from_city}&destination=${to_city}&departureDate=${date}`, {
            headers: { Authorization: `Bearer ${AMADEUS_API_KEY}` },
        });
        return response.data || "No flight data available.";
    } catch (error) {
        return "Error fetching flight details.";
    }
}

async function searchHotel(location) {
    try {
        const response = await axios.get(`https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=${location}`, {
            headers: { Authorization: `Bearer ${AMADEUS_API_KEY}` },
        });
        return response.data || "No hotel data available.";
    } catch (error) {
        return "Error fetching hotel details.";
    }
}

function generateItinerary(destination, days) {
    if (destination.toLowerCase() === "manali") {
        return `Manali Trip Itinerary for ${days} days: \nDay 1: Explore Mall Road & Hidimba Temple.\nDay 2: Visit Solang Valley & Rohtang Pass.\nDay 3: Adventure sports & local food.`;
    }
    return `Here is a ${days}-day itinerary for ${destination}: \nDay 1: Explore city center.\nDay 2: Visit famous attractions.\nDay 3: Try local experiences.`;
}

exports.mytravelwebhook = onRequest(async (req, res) => {
    const parameters = req.body.sessionInfo.parameters || {};
    const queryType = detectQueryType(parameters);
    let responseMessage = "I couldn't find what you're looking for.";

    try {
        if (queryType === "flight") {
            responseMessage = await searchFlight(parameters.from_city, parameters.to_city, parameters.date);
        } else if (queryType === "hotel") {
            responseMessage = await searchHotel(parameters.location);
        } else if (queryType === "itinerary") {
            responseMessage = generateItinerary(parameters.destination, parameters.days);
        }
    } catch (error) {
        responseMessage = "Sorry, something went wrong.";
    }

    res.json({
        fulfillment_response: { messages: [{ text: { text: [responseMessage] } }] },
    });
});

const express = require("express");
const parser = require("body-parser");
const Analyzer = require("./analyzer").Analyzer;

const router = express.Router()
router.use(parser.json());

/**
 * Analyze endpoint - Get all important information about all tickets
 * Query Parameters:
 *  - url: String
 * Response: JSON
 * Response Schema:
 * {
 *  datetime: String,
 *  eventInfo: {
 *      eventName: String,
 *      imageUrl: String
 *  }
 *  availableTickets: [
 *      {
 *          name: String,
 *          price: String,
 *          ticketCount: Int
 *      }
 *  ]
 * }
 * 
 */
router.get('/analyze', async (req, res) => {
    const url = req.query.url;
    const analyze = new Analyzer(url);
    const eventInfo = await analyze.getEventInformation();
    const results = await analyze.getTicketList();

    res.send({
        eventInfo: eventInfo,
        availableTickets: results
    })
});

/**
 * Analyze ticket endpoint - Get # of available tickets for set of
 * wanted tickets.
 * Input Body: JSON
 * Input Body Schema:
 * {
 *  url: String,
 *  ticketNames: Array[String]
 * }
 * Response: JSON
 * Response Schema:
 * {
 *  results: [
 *      {
 *          name: String,
 *          ticketCount: Int
 *      }
 *  ]
 * }
 */
router.post('/analyze/ticket', async (req, res) => {
    const url = req.body.url;
    const ticketNames = req.body.ticketNames;

    const analyze = new Analyzer(url);
    const results = await analyze.getTicketsAvailable(ticketNames);

    res.send({
        results: results
    });
});

module.exports = router;
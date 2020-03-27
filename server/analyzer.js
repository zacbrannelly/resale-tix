const axios = require("axios").default;
const cheerio = require("cheerio");

class Analyzer {
    constructor(url) {
        this.url = url;
    }

    async getEventInformation() {
        // Load and parse event page
        var response = await axios.get(this.url);
        const $ = cheerio.load(response.data);

        var eventName = null;
        var imageUrl = null;

        // Find event name (attemp #1)
        var searcher = $("h1[id=event-summary-title] span");
        eventName = searcher.first().text();

        if (eventName == null || eventName == "") {
            searcher = $("h1[id=event-summary-title]");
            eventName = searcher.first().text();
        }

        // Find event image URL
        searcher = $("a[id=event-summary-thumbnail] img");
        imageUrl = searcher.attr("src");

        return {
            eventName: eventName,
            imageUrl: imageUrl
        }
    }

    async getTicketList() {
        var response = await axios.get(this.url);
        
        var names = [];
        var prices = [];
        var ticketCounts = [];

        // Search the DOM for the ticket names
        const $ = cheerio.load(response.data);
        var searcher = $("li[class='event-ticket-type '] div span[class=ticket-type-name]");
        searcher.each((_, element) => {
            if (element.firstChild.type == "text") {
                names.push(element.firstChild.data);
            }
        });

        // Search the DOM for the ticket prices
        searcher = $("li[class='event-ticket-type '] div span[class='col-totalprice ticket-type-total'] span:first-child")
        searcher.each((_, element) => {
            if (element.firstChild.type == "text") {
                prices.push(element.firstChild.data);
            }
        });

        // Search the DOM for the number of tickets available
        searcher = $("li[class='event-ticket-type '] div[class=ticket-type-costs-and-quantity] div:nth-child(2)")
        searcher.each((_, element) => {
            ticketCounts.push(element.attribs['data-ticket-max-available-for-transaction']);
        });

        var results = names.map((e, i) => {
            return {
                name: e,
                price: prices[i],
                ticketCount: ticketCounts[i]
            };
        });

        return results;
    }

    async getTicketsAvailable(ticketList) {
        var results = await this.getTicketList();

        return results.filter(ticket => ticketList.includes(ticket.name)).map(ticket => {
            return {
                name: ticket.name,
                ticketCount: ticket.ticketCount
            }
        });
    }
};

module.exports.Analyzer = Analyzer;
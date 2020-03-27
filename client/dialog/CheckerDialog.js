import React, { Component } from "react";
import axios from "axios";
import ReadableDuration from "humanize-duration";
import TicketSelectionDialog from "./TicketSelectionDialog";
import HumanizeDuration from "humanize-duration";

export default class CheckerDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bannerType: "COUNTDOWN",
            intervalTime: 5500,
            timeUntilNextUpdate: 5500,
            lastUpdateTime: Date.now(),
            selectedTickets: this.props.selectedTickets.map(ticket => {
                return {
                    ...ticket,
                    timeSinceLastUpdate: ReadableDuration(0) + " ago",
                    timeLastUpdated: Date.now()
                }
            })
        }
        this.checkForTickets = this.checkForTickets.bind(this);
        this.checkForTicketInterval = setInterval(this.checkForTickets, this.state.intervalTime);

        this.updateTicketTableInterval = setInterval(() => {
            const state = this.state
            state.timeUntilNextUpdate = state.intervalTime - (Date.now() - state.lastUpdateTime);
            state.selectedTickets = state.selectedTickets.map(t => {
                return {
                    ...t,
                    timeSinceLastUpdate: ReadableDuration(Date.now() - t.timeLastUpdated, {round: true}) + " ago"
                }
            });
            this.setState(state);
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.updateTicketTableInterval);
        clearInterval(this.checkForTicketInterval);
    }

    checkForTickets() {
        // TODO: Check for new tickets
        /**/
        this.setState({
            ...this.state,
            bannerType: "UPDATING"
        });

        axios.post("./api/analyze/ticket", {
            url: this.props.eventUrl,
            ticketNames: this.props.selectedTickets.map(ticket => {return ticket.name})
        }).then(response => { 
            const results = response.data.results;
            if (results.every(ticket => ticket.ticketCount < 1)) {
                this.setState({
                    ...this.state,
                    bannerType: "COUNTDOWN",
                    selectedTickets: this.state.selectedTickets.map(t => {
                        return {
                            ...t,
                            timeLastUpdated: Date.now()
                        }
                    }),
                    timeUntilNextUpdate: this.state.intervalTime / 1000,
                    lastUpdateTime: Date.now()
                });
            }
            else {
                // TODO: Handle tickets found
            }
        }, error => {
            // TODO: Handle server error
        });
    }

    renderBanner() {
        switch (this.state.bannerType) {
            case "COUNTDOWN":
                return (
                    <section className="hero is-danger">
                        <div className="hero-body">
                            <div className="level">
                                <div className="level-item">
                                        <h1 className="title">NO TICKETS FOUND</h1>
                                </div>
                            </div>
                            <div className="level">
                                <div className="level-item">
                                    <h2 className="subtitle">Checking again in {ReadableDuration(this.state.timeUntilNextUpdate, {round: true})}...</h2>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            case "UPDATING":
                return (
                    <section className="hero is-warning">
                        <div className="hero-body">
                            <div className="level">
                                <div className="level-item">
                                        <h1 className="title"><span className="icon is-large"><i className="fas fa-sync fa-spin"></i> </span><span>UPDATING</span></h1>
                                </div>
                            </div>
                            <div className="level">
                                <div className="level-item">
                                    <h2 className="subtitle">Checking Moshtix for new tickets...</h2>
                                </div>
                            </div>
                        </div>
                    </section>
                );
        }
    }

    render() {
        const selectedTickets = this.state.selectedTickets;
        return (
            <section className="section">
                    <div className="container">
                        <div className="box">
                            <div className="level">
                                <div className="level-left">
                                    <div className="level-item">
                                        <img src={this.props.analysisResults.results.eventInfo.imageUrl} />
                                    </div>
                                    <div className="level-item">
                                        <div className="content">
                                            <p className="title is-spaced">{this.props.analysisResults.results.eventInfo.eventName}</p>
                                            <p className="subtitle">(<a href={this.props.eventUrl}>{this.props.eventUrl}</a>)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="hr" />

                            {this.renderBanner()}

                            <hr className="hr" />

                            <div className="level">
                                <div className="level-left">
                                    <div className="level-item">
                                        <button className="button is-success">
                                            <span className="icon"><i className="fas fa-sync"></i></span>
                                            <span>Check NOW</span>
                                        </button>
                                    </div>

                                    <div className="level-item">
                                        <button className="button is-info">
                                            <span className="icon"><i className="fas fa-clock"></i></span>
                                            <span>Change interval time</span>
                                        </button>
                                    </div>

                                    <div className="level-item">
                                        <button className="button is-warning">
                                            <span className="icon"><i className="fas fa-edit"></i></span>
                                            <span>Change tickets</span>
                                        </button>
                                    </div>

                                    <div className="level-item">
                                        <button className="button is-danger">
                                            <span className="icon"><i className="fas fa-times"></i></span>
                                            <span>Change event</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <table className="table is-bordered is-striped is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Ticket name</th>
                                        <th>Current price</th>
                                        <th>Status</th>
                                        <th>Last checked</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        selectedTickets.map(ticket => {
                                            return (
                                                <tr key={ticket.name + ticket.price}>
                                                    <td>{ticket.name}</td>
                                                    <td>{ticket.price}</td>
                                                    <td>
                                                        <p>
                                                            {ticket.ticketCount < 1 ? 
                                                            (<span className="icon has-text-danger"><i className="fas fa-times-circle"></i> </span>) :
                                                            (<span className="icon has-text-success"><i className="fas fa-check-circle"></i> </span>)}
                                                            <span>{ticket.ticketCount < 1 ? "SOLD OUT": "TICKETS AVAILABLE"}</span>
                                                        </p>
                                                    </td>
                                                    <td>{ticket.timeSinceLastUpdate}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
            </section>
        );
    }
}
import React, { Component } from "react";

import "./TicketSelectionDialog.scss";

export default class TicketSelectionDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTickets: [],
            filterTicketsBy: null
        };
        this.isSelected = this.isSelected.bind(this);
        this.onTicketSelected = this.onTicketSelected.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
        this.search = this.search.bind(this);
        this.renderBox = this.renderBox.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onTicketSelected(ticket) {
        // Don't allow tickets that aren't sold out
        if (ticket.ticketCount > 0) return;

        const state = this.state;
        const ticketName = ticket.name;
        if (!state.selectedTickets.includes(ticketName)) {
            state.selectedTickets.push(ticketName);
        }
        else {
            const i = state.selectedTickets.findIndex(value => value === ticketName)
            state.selectedTickets.splice(i, 1);
        }
        this.setState(state);
    }

    toggleSelectAll() {
        const tickets = this.props.analysisResults.results.availableTickets.filter(t => t.ticketCount == 0);
        var selectedTickets = this.state.selectedTickets;

        if (selectedTickets.length == tickets.length) {
            selectedTickets = [];
        }
        else {
            tickets.forEach(ticket => {
                if (!selectedTickets.includes(ticket.name)) {
                    selectedTickets.push(ticket.name);
                }
            });
        }

        this.setState({
            ...this.state,
            selectedTickets: selectedTickets
        });
    }

    search(searchPhrase) {
        this.setState({
            ...this.state,
            filterTicketsBy: searchPhrase.length > 0 ? searchPhrase.toLowerCase() : null
        });
    }

    isSelected(ticketName) {
        return this.state.selectedTickets.includes(ticketName);
    }

    onSubmit() {
        this.props.selectTickets(this.state.selectedTickets);
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="level">
                        <div className="level-item">
                            {this.renderBox()}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    renderBox() {
        const { resetAll, analysisResults } = this.props;
        return (
            <article className="panel ticket-selection-dialog is-info">
                <p className="panel-heading">
                    Available tickets - Select which you would like
                </p>
                <div className="panel-block">
                    <div className="field is-grouped ticket-selection-search-container">
                        <p className="control is-expanded">
                            <input onChange={(event) => this.search(event.target.value)} className="input is-info" type="text" placeholder="Search" />
                        </p>
                        <p className="control">
                            <button onClick={this.toggleSelectAll} className="button">
                                <span className="icon"><i className="fas fa-check-double"></i></span>
                                <span>Select all</span>
                            </button>
                        </p>
                    </div>
                </div>

                <div className="ticket-selection-scrollable">
                {
                    analysisResults.results.availableTickets.filter(ticket => this.state.filterTicketsBy != null ? ticket.name.toLowerCase().includes(this.state.filterTicketsBy) : true).map(ticket => {
                        return (
                            <a key={ticket.name + (this.isSelected(ticket.name) ? "-selected" : "")} 
                                onClick={() => this.onTicketSelected(ticket)} 
                                className={"panel-block " + (ticket.ticketCount > 0 ? "disabled-item " : "") + (this.isSelected(ticket.name) ? "is-active" : "")}>
                               
                                <span className="panel-icon">
                                    <i className={(this.isSelected(ticket.name) ? "fas" : "far") + " fa-check-circle"} aria-hidden="true"></i>
                                </span>
                                <span className="no-select">
                                    <span className={(ticket.ticketCount > 0 ? "strike": "")}>{ ticket.name.trim() }</span>
                                    <span>{ (ticket.ticketCount > 0 ? " (" + ticket.ticketCount + " tickets currently available)": "") }</span>
                                </span>
                            </a>
                        );
                    })
                }
                </div>

                <div className="level">
                    <div className="level-left">
                        <button onClick={resetAll} className="button is-info ticket-selection-next-button">
                            <span className="icon"><i className="fas fa-arrow-left"></i></span>
                            <span>Back</span>
                        </button>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button onClick={this.onSubmit} className="button is-info ticket-selection-next-button" disabled={this.state.selectedTickets.length == 0}>
                                <span>Next</span>
                                <span className="icon"><i className="fas fa-arrow-right"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}
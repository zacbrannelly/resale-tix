import React, { Component } from "react";
import NavBar from "./components/NavBar"
import URLInputDialog from "./containers/URLInputDialogContainer"
import TicketSelectionDialog from "./containers/TicketSelectionDialogContainer";
import CheckerDialog from "./containers/CheckerDialogContainer";
import "./App.scss"

export default class App extends Component {
    constructor(props) {
        super(props);
        this.renderDialog = this.renderDialog.bind(this);
    }

    renderDialog() {
        const currentDialog = this.props.currentDialog;
        switch (currentDialog) {
            case "URL_INPUT_DIALOG":
                return <URLInputDialog />;
            case "TICKET_SELECTION_DIALOG":
                return <TicketSelectionDialog />;
            case "CHECKER_DIALOG":
                return <CheckerDialog />;
        }
    }

    render() {
        return (
            <div className="app">
                <NavBar />
                {this.renderDialog()}
            </div>
        );
    }
}
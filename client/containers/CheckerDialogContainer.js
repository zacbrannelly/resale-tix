import { connect } from "react-redux";
import CheckerDialog from "../dialog/CheckerDialog";

const mapStateToProps = state => {
    return {
        analysisResults: state.analysisResults,
        eventUrl: state.eventUrl,
        selectedTickets: state.analysisResults.results.availableTickets.filter(ticket => state.selectedTickets.includes(ticket.name))
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

const CheckerDialogContainer = connect(mapStateToProps, mapDispatchToProps)(CheckerDialog);
export default CheckerDialogContainer;
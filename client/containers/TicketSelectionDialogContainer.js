import TicketSelectionDialog from "../dialog/TicketSelectionDialog"
import { connect } from "react-redux";
import { selectTickets, resetAll } from "../reducers"

const mapStateToProps = state => {
    return {
        analysisResults: state.analysisResults
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetAll: () => dispatch(resetAll()),
        selectTickets: tickets => dispatch(selectTickets(tickets))
    };
};

const TicketSelectionDialogContainer = connect(mapStateToProps, mapDispatchToProps)(TicketSelectionDialog);
export default TicketSelectionDialogContainer;
import { connect } from "react-redux";
import App from "../App";

const mapStateToProps = state => {
    return {
        currentDialog: state.currentDialog
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
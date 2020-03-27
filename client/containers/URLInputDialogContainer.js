import URLInputDialog from "../dialog/URLInputDialog"
import { connect } from "react-redux";
import { submitEventUrl } from "../reducers"

const mapStateToProps = state => {
    return state.urlInputDialog;
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitUrl: url => dispatch(submitEventUrl(url))
    };
};

const URLInputDialogContainer = connect(mapStateToProps, mapDispatchToProps)(URLInputDialog);
export default URLInputDialogContainer;
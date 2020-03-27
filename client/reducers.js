// Actions
// ===========================================
export function submitEventUrl(url) {
    return dispatch => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    const response = JSON.parse(request.response);
                    dispatch(analyzeComplete(response));
                    dispatch(showDialog("TICKET_SELECTION_DIALOG"));
                }
                else {
                    // TODO: Handle errors when analyzing link
                    dispatch(analyzeFailed({
                        error: "Unknown error occured"
                    }))
                }
            }
        };
        request.open("GET", "./api/analyze?url=" + encodeURIComponent(url), true);
        request.send();

        dispatch(storeUrl(url));
    };
}

export function showDialog(dialog) {
    return {
        type: "SET_DIALOG",
        dialog: dialog
    };
}

export function resetAll() {
    return {
        type: "RESET_ALL"
    };
}

export function storeUrl(url) {
    return {
        type: "STORE_URL",
        url: url
    };
}

export function analyzeFailed(error) {
    return {
        type: "ANALYZE_FAILED",
        error: error
    };
}

export function analyzeComplete(results) {
    return {
        type: "ANALYZE_COMPLETE",
        results: results
    };
}

export function selectTickets(tickets) {
    return dispatch => {
        dispatch(showDialog("CHECKER_DIALOG"));
        dispatch({
            type: "SELECT_TICKETS",
            tickets: tickets
        });
    };
}

// Reducers
// ===========================================
function currentDialog(state, action) {
    switch (action.type) {
        case "RESET_ALL":
            return "URL_INPUT_DIALOG"
        case "SET_DIALOG":
            return action.dialog;
        default:
            return state;
    }
}

function eventUrl(state, action) {
    switch (action.type) {
        case "STORE_URL":
            return action.url;
        case "RESET_ALL":
            return null;
        default:
            return state;
    }
}

function selectedTickets(state = [], action) {
    switch (action.type) {
        case "SELECT_TICKETS":
            return action.tickets;
        default:
            return state;
    }
}

function analysisResults(state, action) {
    switch (action.type) {
        case "ANALYZE_COMPLETE":
            return {
                results: action.results
            };
        case "ANALYZE_FAILED":
            return {
                error: action.error
            };
        case "RESET_ALL":
            return null;
        default:
            return state;
    }
}

function urlInputDialog(state, action) {
    switch (action.type) {
        case "STORE_URL":
            return {
                ...state,
                isLoading: true
            };
        case "RESET_ALL":
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}

export default function appReducer(state = {}, action) {
    return {
        ...state,
        currentDialog: currentDialog(state.currentDialog, action),
        eventUrl: eventUrl(state.eventUrl, action),
        selectedTickets: selectedTickets(state.selectedTickets, action),
        analysisResults: analysisResults(state.analysisResults, action),
        urlInputDialog: urlInputDialog(state.urlInputDialog, action)
    }
}
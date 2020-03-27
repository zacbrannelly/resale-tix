import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/AppContainer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";
import './index.css'

const initState = {
    currentDialog: "URL_INPUT_DIALOG",
    eventUrl: null,
    selectedTickets: [],
    analysisResults: null,
    urlInputDialog: {
        isLoading: false
    }
};

const store = createStore(
    reducers, 
    initState, 
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
import React, { Component } from "react";
import './URLInputDialog.scss'

export default class URLInputDialog extends Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            showError: false,
            errorMsg: ""
        }
        this.renderBox = this.renderBox.bind(this);
    }

    validate() {
        if (this.urlTextField.value == null || !this.urlTextField.value.match(/^https:\/{2}w{0,3}\.{0,1}m{0,1}\.{0,1}moshtix\.com\.au\/v2/)) {
            this.setState({
                showError: true,
                errorMsg: "Invalid URL entered! Please try another link."
            })
            return false;
        }

        this.setState({
            showError: false,
            errorMsg: ""
        });

        return true;
    }
    
    submit() {
        if (this.validate()) { 
            this.props.onSubmitUrl(this.urlTextField.value);
        }
        else {
            console.log("Failed to submit URL")
        }
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
        const { isLoading } = this.props;
        return (
            <div className="box url-box">
                <div className="field">
                    <label className="label">Enter Moshtix URL:</label>
                    <div className="control">
                        <input 
                            ref={element => this.urlTextField = element}
                            className={"input " + (this.state.showError ? "is-danger" : "")}
                            type="text" 
                            placeholder="e.g. https://moshtix.com.au/v2/event/splendour-in-the-grass-2020/119191?skin=SITG20" />
                    </div>
                </div>
                <div className="level">
                    <div className="level-left">
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button onClick={this.submit} className={"button is-info " + (isLoading ? "is-loading" : "")}>Check event</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
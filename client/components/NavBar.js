import React, { Component } from 'react';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="hero is-info">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">ResaleTix</h1>
                        <h2 className="subtitle">Moshtix Automatic Availability Checker</h2>
                    </div>
                </div>
            </section>
        );
    }
}
import React, { Component } from "react";
import TestForm from "./TestForm.jsx";
import TestContainer from "./TestContainer.jsx";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      isModalShown: false,
      tests: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.addTest = this.addTest.bind(this);
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    socket.emit("testData", {
      url: this.state.url,
      tests: this.state.tests
    });
  }

  showModal = () => this.setState({ isModalShown: true });
  hideModal = () => this.setState({ isModalShown: false });

  addTest(config) {
    // console.log('config ==>', config);
    this.setState(prevState => {
      return prevState.tests.push(config);
    });
  }

  render() {
    return (
      <div>
        <div className="dashWrapper">
          <label className="label">
            <input
              className="input-dashboard"
              type="text"
              placeholder="http://..."
              value={this.state.url}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="dash-button-wrapper">
            <button className="button-1" onClick={this.showModal}>Add Test</button>
            <button className="button-1" onClick={this.handleSubmit}>Run</button>
        </div>
        <TestContainer tests={this.state.tests} />
        <TestForm
          addTest={this.addTest}
          isModalShown={this.state.isModalShown}
          hideModal={this.hideModal}
        />
      </div>
    );
  }
}

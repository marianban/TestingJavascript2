import React from "react";

export class Counter extends React.Component {
  state = { value: 0 };
  handleIncrement = () => {
    this.setState({
      value: this.state.value + 1
    });
  };
  handleDecrement = () => {
    this.setState({
      value: this.state.value - 1
    });
  };
  render() {
    return (
      <div className="counter">
        <button onClick={this.handleIncrement} data-testid="inc">
          +
        </button>
        <span data-testid="value">{this.state.value}</span>
        <button onClick={this.handleDecrement} data-testid="dec">
          -
        </button>
      </div>
    );
  }
}

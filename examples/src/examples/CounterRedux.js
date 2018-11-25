import React from 'react';
import { connect } from 'react-redux';

const Increment = 'Increment';
const increment = () => ({ type: Increment });

const Decrement = 'Decrement';
const decrement = () => ({ type: Decrement });

export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case Increment:
      return state + 1;
    case Decrement:
      return state - 1;
    default:
      return state;
  }
};

class Counter extends React.Component {
  state = { value: 0 };
  handleIncrement = () => {
    const { dispatch } = this.props;
    dispatch(increment());
  };
  handleDecrement = () => {
    const { dispatch } = this.props;
    dispatch(decrement());
  };
  render() {
    const { counter } = this.props;
    return (
      <div className="counter">
        <button onClick={this.handleIncrement} data-testid="inc">
          +
        </button>
        <span data-testid="value">{counter}</span>
        <button onClick={this.handleDecrement} data-testid="dec">
          -
        </button>
      </div>
    );
  }
}

export const CounterRedux = connect(state => state)(Counter);

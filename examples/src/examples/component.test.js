import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { Counter } from './Counter';
import { CounterRedux } from './CounterRedux';
import { render, fireEvent } from 'react-testing-library';
import { rootReducer } from '../reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

test('plain react test', () => {
  var body = document.body;
  const container = body.appendChild(document.createElement('div'));
  ReactDOM.render(<Counter />, container);
  const counter = container.querySelector('span');
  expect(counter.textContent).toBe('0');
  const inc = container.querySelector("button[data-testid='inc']");
});

test.skip('plain react test', () => {
  var body = document.body;
  const container = body.appendChild(document.createElement('div'));
  ReactDOM.render(<Counter />, container);
  const counter = container.querySelector('span');
  expect(counter.textContent).toBe('0');
  const inc = container.querySelector("button[data-testid='inc']");
  Simulate.click(inc);
  expect(counter.textContent).toBe('1');
  ReactDOM.unmountComponentAtNode(container);
  body.removeChild(container);
});

const renderWithProvider = ui => {
  const store = createStore(rootReducer);
  return render(<Provider store={store}>{ui}</Provider>);
};

test('body is empty', () => {
  var body = document.body;
  // expect(body.innerHTML).toBe('');
});

// npm install --save-dev jest-dom
// npm install --save-dev react-testing-library
test.skip('react-testing-library', () => {
  const { getByTestId } = render(<Counter />);
  const counter = getByTestId('value');
  const inc = getByTestId('inc');
  expect(counter).toHaveTextContent('0');
  fireEvent.click(inc);
  expect(counter).toHaveTextContent('1');
});

test.skip('react-testing-library redux test', () => {
  const { getByTestId } = renderWithProvider(<CounterRedux />);
  const counter = getByTestId('value');
  const inc = getByTestId('inc');
  expect(counter).toHaveTextContent('0');
  fireEvent.click(inc);
  expect(counter).toHaveTextContent('1');
});

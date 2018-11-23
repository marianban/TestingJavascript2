import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { Counter } from "./Counter";

test("plain react test", () => {
  var body = document.body;
  const element = document.createElement("div");
  const container = body.appendChild(element);
  ReactDOM.render(<Counter />, container);
  const counter = body.querySelector("span");

  expect(counter.textContent).toBe("0");
  const inc = body.querySelector("button[data-testid='inc']");
  /*
  inc.dispatchEvent(
    new window.MouseEvent("click", {
      bubbles: false,
      cancelable: false,
      view: window
    })
  );
  */
  Simulate.click(inc);

  // ReactDOM.render(<Counter />, container);

  const counter2 = body.querySelector("span");

  expect(counter2.textContent).toBe("1");

  document.body.removeChild(element);
  console.log(document.body.innerHTML);
  ReactDOM.unmountComponentAtNode(element);
});

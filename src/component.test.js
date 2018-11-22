import React from "react";
import ReactDOM from "react-dom";
import { Counter } from "./Counter";

test("plain react test", () => {
  var body = document.createElement("body");
  ReactDOM.render(<Counter />, body);
  const counter = body.querySelector("span");
  expect(counter.textContent).toBe("0");
  const inc = body.querySelector("button[data-testid='inc']");
  console.log("windowddd", window);

  inc.dispatchEvent(
    new window.MouseEvent("click", {
      bubbles: false,
      cancelable: false,
      view: window
    })
  );
  const counter2 = body.querySelector("span");
  expect(counter2.textContent).toBe("1");
});

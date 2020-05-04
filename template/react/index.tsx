/// <reference lib="es2015.iterable" />

import React, { useState } from "react";
import * as ReactDOM from "react-dom";

function Index(): JSX.Element {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));

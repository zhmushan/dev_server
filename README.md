# Dev Server

Feel free to import TypeScript files in the script tag!

## Usage
```
Dev Server

INSTALL:
  deno install --allow-net --allow-read --unstable https://deno.land/x/dev_server/mod.ts

USAGE:
  dev_server [path] [options]

OPTIONS:
  -h, --help          Prints help information
  -p, --port <PORT>   Set port
```

## Getting Started

```html
<!-- index.html -->
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script type="module" src="./index.tsx"></script>
```

```tsx
// index.tsx
const { useState } = React;

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
```

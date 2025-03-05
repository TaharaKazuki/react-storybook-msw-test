import { useState } from 'react';
import { useEffect } from 'react';
import unused from './unused';

function Test() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Test Component</h1>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

export default Test;

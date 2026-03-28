import { useState } from "react";

export function App() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div>
      <button
        style={{ backgroundColor: "green", color: "white" }}
        onClick={() => setShowMessage(true)}
      >
        Click me
      </button>

      {showMessage && (
        <>
          <p>My divine website!</p>
          <button onClick={() => setShowMessage(false)}>Close</button>
        </>
      )}
    </div>
  );
}

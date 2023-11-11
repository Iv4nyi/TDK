// src/components/CodeOutput.js
import React from 'react';

function CodeOutput({ code }) {
  return (
    <div>
      <h2>Generated Code:</h2>
      <pre>{code}</pre>
    </div>
  );
}

export default CodeOutput;

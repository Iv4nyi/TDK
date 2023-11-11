// src/components/InputForm.js
import React, { useState } from 'react';
import { generateCodeFromAPI } from 'C:\\SynologyDrive\\1etM\\7. felev\\Szakdoga\\React\\openai\\client\\src\\utils\\api.js';

function InputForm({ onGenerateCode }) {
  const [idea, setIdea] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('python');

  const handleGenerateCode = async () => {
    // Make an API request to OpenAI with the user's idea and selected language
    // Store the generated code in a state variable
    const generatedCode = await generateCodeFromAPI(idea, selectedLanguage);
    onGenerateCode(generatedCode);
  };

  return (
    <div>
      <textarea
        placeholder="Enter your idea here..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        {/* Add more language options */}
      </select>
      <button onClick={handleGenerateCode}>Generate Code</button>
    </div>
  );
}

export default InputForm;

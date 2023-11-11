// import React, { useState } from 'react';

// function EditableCodeTextbox({value}) {
//   // State to hold the code value
//   const [code, setCode] = useState(value);

//   // Function to handle changes to the code
//   const handleCodeChange = (event) => {
//     setCode(event.target.value);
//   };

//   return (
//     <div>
//       <textarea
//         rows="10" // Set the number of visible rows
//         cols="40" // Set the number of visible columns
//         value={code} // Bind the textarea value to the code state variable
//         onChange={handleCodeChange} // Handle changes to the textarea
//       />
//       <div>
//         <h2>Code Output:</h2>
//         <pre>{code}</pre> {/* Display the code value */}
//       </div>
//     </div>
//   );
// }

// export default EditableCodeTextbox;

// EditableCodeTextbox.js
import React, { useState, useEffect, useRef } from "react";
import Prism from "prismjs"; // Import Prism.js
import "prismjs/themes/prism-tomorrow.css"; // Import a Prism.js theme (choose one)
import "prismjs/components/prism-python";
import { style } from "@mui/system";
import { isEqual } from "lodash";
import CodeEditor from "@uiw/react-textarea-code-editor";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/webpack-resolver";
import Button from "@mui/material/Button";

const EditableCodeTextbox = ({ code, onCodeChange, readOnly, saveVisible }) => {
  // State to hold the code value
  const [editing, setEditing] = useState(false);
  const [editedCode, setEditedCode] = useState(code);
  const textareaRef = useRef(null);

  const handleCodeEdit = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    // setEditedCode(e.target.value);
    setEditedCode(e);

    // if (textareaRef.current) {
    //   textareaRef.current.style.height = 'auto';
    //   textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    // }
  };

  useEffect(() => {
    // Only update the editedCode state if code prop has changed
    if (!isEqual(code, editedCode)) {
      setEditedCode(code);
    }
  }, [code]);

  const handleSave = () => {
    onCodeChange(editedCode); // Call the parent's callback function with the new code
    setEditing(false);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [editedCode]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        {editing ? (
          <>
            <textarea
              ref={textareaRef}
              value={editedCode}
              onChange={handleInputChange}
              rows={10}
              cols={40}
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            {/* <pre>{code}</pre> */}
            <div style={{ borderRadius: "8px", overflow: "hidden" }}>
              <AceEditor
                mode="python"
                theme="monokai"
                value={editedCode}
                onChange={handleInputChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                fontSize={16}
                wrapEnabled={true}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  readOnly: readOnly,
                }}
              />
            </div>
            {/* <button onClick={handleCodeEdit}>Edit</button> */}
            {saveVisible ? (
              <Button
                sx={{
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
                variant="contained"
                onClick={handleSave}
              >
                Save
              </Button>
            ) : null}
          </>
        )}
      </div>
      {/* <div>
        <h2>Code Output:</h2>
        <pre>
          <code className="language-python">{editedCode}</code>
        </pre>
      </div> */}
    </div>
  );
};

export default EditableCodeTextbox;

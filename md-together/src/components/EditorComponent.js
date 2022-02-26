import React from "react";
import MDEditor from '@uiw/react-md-editor';

// using react-md-editor as the markdown editor
// this component is built on the top of example given in react-md-editor documentation
// https://uiwjs.github.io/react-md-editor/
export default function EditorComponent() {
  // The Current State of Markdown File
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div>
      <MDEditor
        value={value}
        onChange={setValue}
        visiableDragbar={false}
        height={"90vh"}
      />
      {/* <MDEditor.Markdown source={value} /> */}
    </div>
  );
}
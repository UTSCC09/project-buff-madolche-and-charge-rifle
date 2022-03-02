import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { connect } from 'react-redux';
import { creatProject } from '../store/actions/projectAction';

// using react-md-editor as the markdown editor
// this component is built on the top of example given in react-md-editor documentation
// https://uiwjs.github.io/react-md-editor/
function EditorComponent(prop) {
  // The Current State of Markdown File
  // console.log(prop.project[0].value);
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div>
      <MDEditor
        value={prop.project[0].value}
        onChange={setValue}
        visiableDragbar={false}
        height={"90vh"}
      />
      {/* <MDEditor.Markdown source={value} /> */}
    </div>
  );
}
const mapStateToProp = (state) => {
  return {
    project: state.project.project
  }
}
export default connect(mapStateToProp)(EditorComponent)
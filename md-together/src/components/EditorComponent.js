import React from "react";
import MDEditor from '@uiw/react-md-editor';

// Used ImgBB https://imgbb.com/ to host our logo for free
let defaultWelcome = `# Welcome to mdTogether!
![mdTogetherLogo](https://i.ibb.co/cC52gS3/logo.png)

**You can collaborate on your Markdown files with other users!**

- Log In / Sign Up to your account.
- In **User Space**, manage your own markdown files, collaborations, and invitations.
- Invite users by clicking the **Invite** button under **Share** tab in the navbar above.
- You can also **Export** current markdown files into data format you want!
- Change the **Theme** that best fit your mood today!
`

// using react-md-editor as the markdown editor
// this component is built on the top of example given in react-md-editor documentation
// https://uiwjs.github.io/react-md-editor/
export default function EditorComponent() {
  // The Current State of Markdown File
  const [value, setValue] = React.useState(defaultWelcome);
  // console.log(value);
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
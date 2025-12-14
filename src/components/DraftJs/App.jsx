import React from "react"
import Editor from "./components/Editor"
import { stateToHTML } from "draft-js-export-html"
import { stateFromHTML } from "draft-js-import-html"

function DraftEditor({ oldContent, setContentHTML }) {
  return (
    <div>
      <Editor
        setContentHTML={(value) => setContentHTML(stateToHTML(value))}
        existingContent={stateFromHTML(oldContent)}
      />
    </div>
  )
}

export default DraftEditor

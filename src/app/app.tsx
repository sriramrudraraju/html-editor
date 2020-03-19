import React, { useState, useCallback } from 'react';

import { Parser } from './parser/parser.component';

import './app.css';


const example1 = `
<style>
.button-basics-example {
  color: red
}
</style>
<button class="button-basics-example">Save</button>`;

const example2 = `
    <style>
      .author {
        color: blue
      }
    </style>
    <div>
      <div class="quote" style="color: red">Quote: {{quote}}</div>
      <p>just a line</p>
      <div class="author">Author: {{author}}</div>
    </div>
`;

function App() {

  const [html, setHtml] = useState(example2);

  const onHtmlChange = useCallback(
    (event: any) => {
      setHtml(event.target.value)
    },
    [setHtml]
  )

  return (
    <div className="app">
      <div className="app-editor">
        <div className="app-html">
          <h2>Html Editor</h2>
          <textarea 
            style={{width: '95%', height: '85%', fontSize: 14}} 
            placeholder="Html" 
            onChange={onHtmlChange} 
            defaultValue={example2} 
          />
        </div>
        <div className="app-api">
          <h4>Instructions</h4>
          <ul>
            <li>variable should be wrapped in <small>{`{{ }}`}</small></li>
            <li>for now, only 'author' and 'quote' variables have hardcoded values</li>
            <li>parse on onchange textarea input</li>
          </ul>
        </div>
      </div>
      <div className="app-preview">
        <h2>Preview</h2>
        <div style={{border: '1px solid black', height: '100%', padding: 8}}>{ html && <Parser input={html} /> }</div>
      </div>
    </div>
  );
}

export default App;

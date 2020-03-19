import React, { useState, useCallback } from 'react';

import { Parser } from './parser/parser.component';
import { BindingsTable } from './bindings-table/bindings-table.component';

import { convertArrayToObjectKeys, getBindingsArray, example } from './utilities';

import './app.css';

export const App = () => {

  const [html, setHtml] = useState(example);

  // TODO: uncomment
  // const [bindings, setBindings] = useState({});
  // sinec we have default example value
  const [bindings, setBindings] = useState(
    convertArrayToObjectKeys(getBindingsArray(example))
  );

  const onHtmlChange = useCallback(
    (event: any) => {
      const text = event.target.value;
      const bindings = getBindingsArray(text);
      const bindingsObject = convertArrayToObjectKeys(bindings);
      setBindings(bindingsObject);
      setHtml(text);
    },
    [setHtml]
  );

  const onBindingsTableValueChange = useCallback(
    (key: any, value: any) => {
      setBindings({
        ...bindings,
       [key]: value
      })
    },
    [bindings]
  );

  return (
    <div className="app">
      <div className="app-editor">
        <div className="app-html">
          <h2>Html Editor</h2>
          <textarea 
            style={{width: '95%', height: '80%', fontSize: 14}} 
            placeholder="Html" 
            onChange={onHtmlChange} 
            defaultValue={example} 
          />
        </div>
        <div>
          <h2>Bindings</h2>
          <BindingsTable bindings={bindings} onValueChange={onBindingsTableValueChange} />
        </div>
        <div className="app-api">
          <h4>Instructions</h4>
          <ul>
            <li>Variables should be wrapped in <small>{`{{ }}`}</small></li>
            <li>Change the values in bindings table, to simulate api response</li>
          </ul>
        </div>
      </div>
      <div className="app-preview">
        <h2>Preview</h2>
        <div style={{border: '1px solid black', height: '100%', padding: 8}}>
          { html && <Parser input={html} bindings={bindings} /> }
        </div>
      </div>
    </div>
  );
}

export default App;

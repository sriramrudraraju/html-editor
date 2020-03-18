import React from 'react';

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
<main class="main">
      <div class="quote">{quote}</div>
      <div class="author">{author}</div>
    </main>
`;

function App() {
  return (
    <div className="App">
      {/* <div>
        Simple Example :  
        <Parser input={example1} />
      </div> */}
      <div>
        Example 2
        <Parser input={example2} interval/>
      </div>
      <div>
        Example 3
        <Parser input={example2} interval/>
      </div>
    </div>
  );
}

export default App;

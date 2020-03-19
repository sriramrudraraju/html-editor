export const example = `
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

export function convertArrayToObjectKeys<T>(arr: T[]) {
  if(arr === null || arr.length === 0 ) {
    return {};
  }
  // convert array of values to object with keys as values of array
  // eslint-disable-next-line no-sequences
  return arr.reduce((a: any,b) => (a[b]='', a), {});
}

// array of names/keys that are wrapped inside {{ }}
export function getBindingsArray(input: string) {
  // match the strings with brackets around them
  const matchedResults = input.match(/{\{(.*?)}\}/g);
  // replace the brackets with empty char
  const results = matchedResults && matchedResults.map(function(val){
      return val.replace(/{\{|}\}/g,'');
  });
  return results || [];
}

export function isObjectEmpty(obj: any) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
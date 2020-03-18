import React, { FC, useState, useMemo } from 'react';
import ReactHtmlParser from 'react-html-parser';

interface ParserProps {
  input: string;
  interval?: boolean;
}

function convertArrayToObjectKeys<T>(arr: T[]) {
  if(arr === null || arr.length === 0 ) {
    return {};
  }
  // convert array of values to object with keys as values of array
  return arr.reduce((a: any,b) => (a[b]='', a), {});
}

export const Parser: FC<ParserProps> = ({input, interval = false}) => {

  // array of names/keys that are wrapped inside { }
 const bindings = useMemo(
   () => {
    // match the strings with brackets around them
    const matchedResults = input.match(/{(.*?)}/g);
    // replace the brackets with empty char
    const results = matchedResults && matchedResults.map(function(val){
        return val.replace(/{|}/g,'');
    });
   return results || [];
   },
   [input]
 );

 const [state, setState] = useState(convertArrayToObjectKeys(bindings));

 // string after replacing names in { } with their respective values
 const output = useMemo(
  () => {
   const mapObj: any = state;
  const re = new RegExp((Object.keys(mapObj).map(key => `{${key}}`)).join("|"),"gi");
  const replaced = input.replace(re, function(matched){
    const prop = matched.replace(/{|}/g,'');
    return mapObj[prop];
  });
  return replaced;
  },
  [state, input]
);

  return <React.Fragment>{ReactHtmlParser(output)}</React.Fragment>;
}
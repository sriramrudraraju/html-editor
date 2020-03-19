import React, { FC, useMemo } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { isObjectEmpty } from '../utilities';

interface ParserProps {
  input: string;
  bindings: object;
}

export const Parser: FC<ParserProps> = ({input, bindings}) => {

 // string after replacing names in {{ }} with their respective values
 const output = useMemo(
  () => {
    if (isObjectEmpty(bindings)) {
      return input;
    }
    const mapObj: any = bindings;
    const re = new RegExp((Object.keys(mapObj).map(key => `{{${key}}}`)).join("|"),"gi");
    const replaced = input.replace(re, function(matched){
      const prop = matched.replace(/{\{|}\}/g,'');
      return mapObj[prop];
    });
    return replaced;
  },
  [input, bindings]
);

  return <React.Fragment>{ReactHtmlParser(output)}</React.Fragment>;
}
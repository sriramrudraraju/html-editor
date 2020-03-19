import React, { FC, useCallback } from 'react';

interface BindingsTableProps {
  bindings: any;
  onValueChange: (key: any, value: any) => void;
}

export const BindingsTable: FC<BindingsTableProps> = ({bindings, onValueChange}) => {
  const onChangeInput = useCallback(
    (key, event: any) => {
      onValueChange(key, event.target.value);
    },
    [onValueChange]
  );

  return (
    <div>
      <table style={{width: '90%'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(bindings).map((key) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    <input 
                      defaultValue={bindings[key]} 
                      onChange={(event) => onChangeInput(key, event)}
                      style={{width: '98%'}} 
                    />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

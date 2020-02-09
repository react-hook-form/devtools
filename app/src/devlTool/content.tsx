import * as React from 'react';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import { Control } from 'react-hook-form';
import { useEffect } from 'react';
import colors from './colors';

export default ({
  control: { fieldsRef, getValues, formState, errorsRef, readFormStateRef },
}: {
  control: Control;
}) => {
  const [, setData] = React.useState({});
  const result = getValues();
  useEffect(() => {
    setData(true);
  }, []);

  console.log(formState.touched);

  return (
    <div
      style={{
        overflow: 'auto',
      }}
    >
      <input
        style={{
          display: 'block',
          borderRadius: 0,
          width: '100%',
          padding: '5px 10px',
          WebkitAppearance: 'none',
          appearance: 'none',
          fontSize: 14,
          border: 0,
          // background: colors.lightBlue,
        }}
        placeholder="Filter name..."
        type="search"
      />
      {Object.entries(fieldsRef.current).map(([name, value]) => {
        const error = get(errorsRef.current, name, {});
        const errorMessage = get(error, 'message', undefined);
        const errorType = get(error, 'type', undefined);
        const type = get(value, 'ref.type', undefined);
        const isTouched = get(formState.touched, name);

        // console.log('for', formState);
        console.log(errorMessage);
        return (
          <section
            key={name}
            style={{ borderBottom: `1px dashed ${colors.secondary}` }}
          >
            <table
              style={{
                padding: '5px 10px 10px',
                width: '100%',
              }}
            >
              <thead>
                <tr>
                  <td style={{ width: 90 }}>
                    <header>
                      <code
                        style={{
                          border: '1px solid white',
                          borderRadius: 2,
                          padding: '3px 10px',
                          display: 'inline-block',
                          fontSize: 10,
                          textAlign: 'center',
                        }}
                      >
                        {(value as any).ref.type ? 'Native' : 'Custom'}
                      </code>
                    </header>
                  </td>
                  <td>
                    <p>{name}</p>
                  </td>
                </tr>
              </thead>
              <tbody>
                {type && (
                  <tr>
                    <td align="right">Type:</td>
                    <td>{type}</td>
                  </tr>
                )}
                {errorType && (
                  <tr>
                    <td align="right">ERROR Type:</td>
                    <td>{errorType}</td>
                  </tr>
                )}
                {errorMessage && (
                  <tr>
                    <td align="right">MESSAGE:</td>
                    <td>{errorMessage.trim()}</td>
                  </tr>
                )}
                {!isUndefined(result[name]) && (
                  <tr>
                    <td align="right">VALUE:</td>
                    <td>{result[name]}</td>
                  </tr>
                )}
                {readFormStateRef.current.touched && (
                  <tr>
                    <td align="right">TOUCHED:</td>
                    <td>
                      <code
                        style={{
                          color: isTouched ? colors.green : colors.lightPink,
                        }}
                      >
                        {isTouched ? 'true' : 'false'}
                      </code>
                    </td>
                  </tr>
                )}
                {(readFormStateRef.current as any).dirtyFields && (
                  <tr>
                    <td align="right">DIRTY:</td>
                    <td>
                      <code
                        style={{
                          color: isTouched ? colors.green : colors.lightPink,
                        }}
                      >
                        {formState.dirtyFields.has(name) ? 'true' : 'false'}
                      </code>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
  );
};

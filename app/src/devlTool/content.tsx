import * as React from 'react';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import { Control } from 'react-hook-form';
import { useEffect } from 'react';
import colors from './colors';

const styles = {
  button: {
    background: colors.blue,
    border: 0,
    color: 'white',
    padding: 5,
  },
};

export default ({
  control: { fieldsRef, getValues, formState, errorsRef, readFormStateRef },
}: {
  control: Control;
}) => {
  const [, setData] = React.useState({});
  const result = getValues();
  useEffect(() => {
    setData({});
  }, []);

  console.log(formState.touched);

  return (
    <div
      style={{
        overflow: 'auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `1fr 1fr 1fr`,
        }}
      >
        <button
          style={{
            ...styles.button,
            borderRight: `1px solid ${colors.primary}`,
          }}
          onClick={() => setData({})}
        >
          UPDATE
        </button>
        <button
          style={{
            ...styles.button,
            borderRight: `1px solid ${colors.primary}`,
          }}
          onClick={() => setData({})}
        >
          COLLAPSE
        </button>
        <button style={styles.button} onClick={() => setData({})}>
          FILTER
        </button>

        {/*<input*/}
        {/*  style={{*/}
        {/*    display: 'inline-block',*/}
        {/*    borderRadius: 0,*/}
        {/*    width: '100%',*/}
        {/*    padding: '5px 10px',*/}
        {/*    WebkitAppearance: 'none',*/}
        {/*    appearance: 'none',*/}
        {/*    fontSize: 14,*/}
        {/*    border: 0,*/}
        {/*    // maxHeight: 0,*/}
        {/*    // background: colors.lightBlue,*/}
        {/*  }}*/}
        {/*  placeholder="Filter name..."*/}
        {/*  type="search"*/}
        {/*/>*/}
      </div>
      {Object.entries(fieldsRef.current).map(([name, value]) => {
        const error = get(errorsRef.current, name, true);
        const errorMessage = get(error, 'message', undefined);
        const errorType = get(error, 'type', undefined);
        const type = get(value, 'ref.type', undefined);
        const isTouched = get(formState.touched, name);
        const isNative = (value as any).ref.type;

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
                    <button
                      style={{
                        border: `1px solid ${colors.blue}`,
                        borderRadius: 2,
                        padding: '3px 5px',
                        display: 'inline-block',
                        fontSize: 14,
                        lineHeight: '12px',
                        textAlign: 'center',
                        marginRight: 10,
                        background: colors.blue,
                        color: 'white',
                      }}
                    >
                      -
                    </button>
                    <span
                      style={{
                        border: '1px solid white',
                        borderRadius: 2,
                        padding: '3px 10px',
                        display: 'inline-block',
                        fontSize: 10,
                        textAlign: 'center',
                        ...(isNative
                          ? {}
                          : { background: '#fff', color: '#000' }),
                      }}
                    >
                      {isNative ? 'Native' : 'Custom'}
                    </span>
                  </td>
                  <td>
                    <p>{name}</p>
                  </td>
                </tr>
              </thead>
              <tbody>
                {error && (
                  <tr>
                    <td align="right" style={{ paddingRight: 5 }}>
                      VALID:
                    </td>
                    <td>
                      <code
                        style={{
                          fontSize: 12,
                          color: error ? colors.lightPink : colors.green,
                        }}
                      >
                        {error ? 'false' : 'true'}
                      </code>
                    </td>
                  </tr>
                )}
                {type && (
                  <tr>
                    <td align="right" style={{ paddingRight: 5 }}>
                      Type:
                    </td>
                    <td>{type}</td>
                  </tr>
                )}
                {errorType && (
                  <tr>
                    <td align="right" style={{ paddingRight: 5 }}>
                      ERROR Type:
                    </td>
                    <td>{errorType}</td>
                  </tr>
                )}
                {errorMessage && (
                  <tr>
                    <td align="right" style={{ paddingRight: 5 }}>
                      MESSAGE:
                    </td>
                    <td>{errorMessage.trim()}</td>
                  </tr>
                )}
                {!isUndefined(result[name]) && (
                  <tr>
                    <td align="right" style={{ paddingRight: 5 }}>
                      VALUE:
                    </td>
                    <td>{result[name]}</td>
                  </tr>
                )}
                {readFormStateRef.current.touched && (
                  <tr>
                    <td align="right" style={{ paddingRight: 5 }}>
                      TOUCHED:
                    </td>
                    <td>
                      <code
                        style={{
                          fontSize: 12,
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
                    <td align="right" style={{ paddingRight: 5 }}>
                      DIRTY:
                    </td>
                    <td>
                      <code
                        style={{
                          fontSize: 12,
                          color: formState.dirtyFields.has(name)
                            ? colors.green
                            : colors.lightPink,
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

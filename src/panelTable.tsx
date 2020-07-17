import * as React from 'react';
import { Animate } from 'react-simple-animate';
import isUndefined from 'lodash/isUndefined';
import isObject from 'lodash/isObject';
import get from 'lodash/get';
import colors from './colors';
import { Button, Table, paraGraphDefaultStyle } from './styled';

type Props = {
  isNative: boolean;
  errorMessage: string | undefined;
  errorType: string | undefined;
  hasError: boolean;
  type: string | undefined;
  isTouched: boolean;
  isDirty: boolean;
  readFormStateRef: React.MutableRefObject<{
    touched: boolean;
  }>;
  index: number;
  fieldsValues: any;
  name: string;
  collapseAll: boolean;
  refObject: any;
};

const PanelTable = ({
  refObject,
  hasError,
  isDirty,
  fieldsValues,
  readFormStateRef,
  isNative,
  errorMessage,
  errorType,
  type,
  isTouched,
  name,
  collapseAll,
  index,
}: Props) => {
  const [collapse, setCollapse] = React.useState(false);

  React.useEffect(() => {
    setCollapse(!collapseAll);
  }, [collapseAll]);

  let value = fieldsValues ? get(fieldsValues, name) : '';

  if (!isUndefined(value)) {
    if (isObject(value)) {
      try {
        value = (
          <pre style={{ margin: 0 }}>
            <code style={{ fontSize: 12 }}>
              {JSON.stringify(value, null, 2)}
            </code>
          </pre>
        );
      } catch {
        value = <span>[Nested Object]</span>;
      }
    } else if (typeof value !== 'string') {
      value = String(value);
    }
  }

  return (
    <Animate
      play
      start={{ opacity: 0, transform: 'translateY(10px)' }}
      end={{ opacity: 1 }}
      easeType="ease-in"
      delay={index * 0.1}
    >
      <Table
        style={{
          padding: '10px 10px 10px',
          width: '100%',
          transition: '.3s all',
          borderLeft: `2px solid ${
            hasError ? colors.secondary : colors.buttonBlue
          }`,
        }}
      >
        <thead>
          <tr>
            <td valign="top" style={{ width: 100, lineHeight: '22px' }}>
              <Button
                onClick={() => setCollapse(!collapse)}
                title="Toggle field table"
                style={{
                  border: `1px solid ${colors.lightBlue}`,
                  borderRadius: 2,
                  padding: '3px 5px',
                  display: 'inline-block',
                  fontSize: 10,
                  lineHeight: '12px',
                  width: 20,
                  textAlign: 'center',
                  marginRight: 10,
                }}
              >
                {collapse ? '+' : '-'}
              </Button>
              <Button
                onClick={() => {
                  if (refObject.scrollIntoView) {
                    refObject.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                title="Scroll into view"
                style={{
                  border: `1px solid ${colors.lightBlue}`,
                  borderRadius: 2,
                  padding: '3px 5px',
                  display: 'inline-block',
                  fontSize: 10,
                  lineHeight: '12px',
                  textAlign: 'center',
                  marginRight: 10,
                  ...(isNative
                    ? {}
                    : { cursor: 'not-allowed', background: colors.lightBlue }),
                }}
              >
                {isNative ? 'Native' : 'Custom'}
              </Button>
            </td>
            <td
              style={{
                display: 'block',
                maxWidth: 100,
              }}
            >
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  ...paraGraphDefaultStyle,
                }}
                title={name}
              >
                {name}
              </p>
            </td>
          </tr>
        </thead>
        {!collapse && (
          <tbody>
            {type && (
              <tr>
                <td
                  align="right"
                  style={{
                    paddingRight: 5,
                    fontWeight: 500,
                    verticalAlign: 'top',
                    ...paraGraphDefaultStyle,
                  }}
                >
                  Type:
                </td>
                <td
                  style={{
                    display: 'block',
                    maxWidth: 100,
                    ...paraGraphDefaultStyle,
                  }}
                >
                  {type}
                </td>
              </tr>
            )}
            {errorType && (
              <tr>
                <td
                  align="right"
                  style={{
                    paddingRight: 5,
                    fontWeight: 500,
                    verticalAlign: 'top',
                    ...paraGraphDefaultStyle,
                  }}
                >
                  ERROR Type:
                </td>
                <td
                  style={{
                    display: 'block',
                    maxWidth: 100,
                    ...paraGraphDefaultStyle,
                  }}
                >
                  {errorType}
                </td>
              </tr>
            )}
            {errorMessage && (
              <tr>
                <td
                  align="right"
                  style={{
                    paddingRight: 5,
                    fontWeight: 500,
                    verticalAlign: 'top',
                    ...paraGraphDefaultStyle,
                  }}
                >
                  MESSAGE:
                </td>
                <td
                  style={{
                    display: 'block',
                    maxWidth: 100,
                    ...paraGraphDefaultStyle,
                  }}
                >
                  {errorMessage.trim()}
                </td>
              </tr>
            )}
            {!isUndefined(value) && (
              <tr>
                <td
                  align="right"
                  style={{
                    paddingRight: 5,
                    fontWeight: 500,
                    verticalAlign: 'top',
                    ...paraGraphDefaultStyle,
                  }}
                >
                  Value:
                </td>
                <td
                  data-testid={`${name}-field-value`}
                  style={{
                    display: 'block',
                    maxWidth: 100,
                    ...paraGraphDefaultStyle,
                  }}
                >
                  {value}
                </td>
              </tr>
            )}
            {readFormStateRef.current.touched && (
              <tr>
                <td
                  align="right"
                  style={{
                    paddingRight: 5,
                    fontWeight: 500,
                    verticalAlign: 'top',
                    ...paraGraphDefaultStyle,
                  }}
                >
                  Touched:
                </td>
                <td>
                  <code
                    style={{
                      color: isTouched ? colors.green : colors.lightPink,
                      ...paraGraphDefaultStyle,
                      fontSize: 12,
                    }}
                  >
                    {isTouched ? 'true' : 'false'}
                  </code>
                </td>
              </tr>
            )}
            {(readFormStateRef.current as any).dirtyFields && (
              <tr>
                <td
                  align="right"
                  style={{
                    paddingRight: 5,
                    fontWeight: 500,
                    verticalAlign: 'top',
                    ...paraGraphDefaultStyle,
                  }}
                >
                  Dirty:
                </td>
                <td>
                  <code
                    style={{
                      color: isDirty ? colors.green : colors.lightPink,
                      ...paraGraphDefaultStyle,
                      fontSize: 12,
                    }}
                  >
                    {isDirty ? 'true' : 'false'}
                  </code>
                </td>
              </tr>
            )}
          </tbody>
        )}
      </Table>
    </Animate>
  );
};

export default PanelTable;

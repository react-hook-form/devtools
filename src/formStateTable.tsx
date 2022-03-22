import * as React from 'react';
import { Animate } from 'react-simple-animate';

import colors from './colors';
import { Button, paraGraphDefaultStyle } from './styled';

type Props = {
  formState: any;
  showFormState: boolean;
  setShowFormState: (payload: boolean) => void;
};

const FormStateTable = ({
  formState,
  showFormState,
  setShowFormState,
}: Props) => (
  <div
    style={{
      alignSelf: 'end',
    }}
  >
    <Animate
      play={showFormState}
      start={{ opacity: 0 }}
      end={{ opacity: 1 }}
      render={({ style }) => (
        <table
          style={{
            padding: '5px 10px',
            display: 'block',
            background: 'black',
            borderTop: `1px solid ${colors.lightPink}`,
            pointerEvents: 'none',
            ...style,
          }}
        >
          <tbody>
            <tr>
              <td align="right" style={{ width: 90, ...paraGraphDefaultStyle }}>
                Valid:
              </td>
              <td
                style={{
                  color: formState.isValid ? colors.green : colors.lightPink,
                  ...paraGraphDefaultStyle,
                }}
              >
                {formState.isValid ? 'true' : 'false'}
              </td>
            </tr>
            <tr>
              <td align="right" style={{ ...paraGraphDefaultStyle }}>
                Dirty:
              </td>
              <td
                style={{
                  color: formState.isDirty ? colors.green : colors.lightPink,
                  ...paraGraphDefaultStyle,
                }}
              >
                {formState.isDirty ? 'true' : 'false'}
              </td>
            </tr>
            <tr>
              <td align="right" style={{ ...paraGraphDefaultStyle }}>
                Submitted:
              </td>
              <td
                style={{
                  color: formState.isSubmitted
                    ? colors.green
                    : colors.lightPink,
                  ...paraGraphDefaultStyle,
                }}
              >
                {formState.isSubmitted ? 'true' : 'false'}
              </td>
            </tr>
            <tr>
              <td align="right" style={{ ...paraGraphDefaultStyle }}>
                Count:
              </td>
              <td
                style={{
                  color: formState.submitCount
                    ? colors.green
                    : colors.lightPink,
                  ...paraGraphDefaultStyle,
                }}
              >
                {formState.submitCount}
              </td>
            </tr>
            <tr>
              <td
                align="right"
                style={{
                  ...paraGraphDefaultStyle,
                }}
              >
                Submitting:
              </td>
              <td
                style={{
                  color: formState.isSubmitting
                    ? colors.green
                    : colors.lightPink,
                  ...paraGraphDefaultStyle,
                }}
              >
                {formState.isSubmitting ? 'true' : 'false'}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    />
    <Button
      style={{
        margin: 0,
        width: '100%',
        padding: '8px 10px',
        textTransform: 'none',
        fontSize: 12,
        lineHeight: '14px',
        cursor: 'pointer',
      }}
      title="Toggle form state panel"
      onClick={() => {
        setShowFormState(!showFormState);
      }}
    >
      <span
        style={{
          transition: '0.5s all',
          color: formState.isValid ? colors.green : colors.lightPink,
        }}
      >
        ■
      </span>{' '}
      Form State: {showFormState ? 'OFF' : 'ON'}
    </Button>
  </div>
);

export default FormStateTable;

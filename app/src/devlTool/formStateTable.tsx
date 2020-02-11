import colors from './colors';
import * as React from 'react';
import { FormStateProxy } from 'react-hook-form';
import { Button } from './styled';

type Props = {
  formState: FormStateProxy<Record<string, any>>;
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
    {showFormState && (
      <table
        style={{
          padding: 10,
          display: 'block',
          background: 'black',
          borderTop: `1px solid ${colors.lightPink}`,
        }}
      >
        <tbody>
          <tr>
            <td align="right" style={{ width: 90 }}>
              Valid:
            </td>
            <td
              style={{
                color: formState.isValid ? colors.green : colors.lightPink,
              }}
            >
              {formState.isValid ? 'true' : 'false'}
            </td>
          </tr>
          <tr>
            <td align="right">Submitted:</td>
            <td
              style={{
                color: formState.isSubmitted ? colors.green : colors.lightPink,
              }}
            >
              {formState.isSubmitted ? 'true' : 'false'}
            </td>
          </tr>
          <tr>
            <td align="right">Count:</td>
            <td
              style={{
                color: formState.submitCount ? colors.green : colors.lightPink,
              }}
            >
              {formState.submitCount}
            </td>
          </tr>
          <tr>
            <td align="right">Submitting:</td>
            <td
              style={{
                color: formState.isSubmitting ? colors.green : colors.lightPink,
              }}
            >
              {formState.isSubmitting ? 'true' : 'false'}
            </td>
          </tr>
        </tbody>
      </table>
    )}
    <Button
      style={{
        margin: 0,
        width: '100%',
        padding: '8px 10px',
        textTransform: 'none',
      }}
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

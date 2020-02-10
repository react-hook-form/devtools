import colors from './colors';
import * as React from 'react';
import { Control } from 'react-hook-form';
import defaultStyles from './defaultStyles';

type Props = {
  setVisible: (visible: boolean) => void;
  control: Control;
};

export default ({ setVisible, control }: Props) => (
  <header
    style={{
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 10,
    }}
  >
    <p
      style={{
        margin: 0,
        padding: 0,
        fontWeight: 600,
      }}
    >
      <span
        style={{
          color: control.formState.isValid ? colors.green : colors.lightPink,
        }}
      >
        ■
      </span>{' '}
      RHF DevTools
    </p>
    <button
      onClick={() => setVisible(false)}
      style={{
        ...defaultStyles.button,
        fontSize: 14,
        fontWeight: 'bold',
        margin: 0,
        padding: '0 10px',
        marginRight: 4,
        marginLeft: 'auto',
      }}
    >
      ✕
    </button>
  </header>
);

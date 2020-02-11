import colors from './colors';
import * as React from 'react';
import { Control } from 'react-hook-form';
import { CircleButton } from './styled';

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
          transition: '0.5s all',
          color: control.formState.isValid ? colors.green : colors.lightPink,
        }}
      >
        ■
      </span>{' '}
      RHF DevTools
    </p>
    <CircleButton onClick={() => setVisible(false)}>✕</CircleButton>
  </header>
);

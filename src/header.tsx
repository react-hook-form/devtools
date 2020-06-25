import colors from './colors';
import * as React from 'react';
import { Control } from 'react-hook-form';
import { CircleButton, paraGraphDefaultStyle } from './styled';

type Props = {
  setVisible: any;
  control: Control;
};

const Header = ({ setVisible, control }: Props) => {
  return (
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
          ...paraGraphDefaultStyle,
        }}
      >
        <span
          style={{
            transition: '0.5s all',
            color:
              control.readFormStateRef.current.isValid &&
              control.formState.isValid
                ? colors.green
                : colors.lightPink,
          }}
        >
          ■
        </span>{' '}
        RHF DevTools
      </p>
      <CircleButton title="Close dev panel" onClick={() => setVisible(false)}>
        ✕
      </CircleButton>
    </header>
  );
};

export default Header;

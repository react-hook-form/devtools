import * as React from 'react';
import { Control, useFormState } from 'react-hook-form';

import colors from './colors';
import { CircleButton, paraGraphDefaultStyle } from './styled';

type Props = {
  setVisible: any;
  control: Control;
};

const Header = ({ setVisible, control }: Props) => {
  const { isValid } = useFormState({
    control,
  });

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor: 'transparent',
      }}
    >
      <p
        style={{
          ...paraGraphDefaultStyle,
          margin: 0,
          padding: 0,
          fontWeight: 400,
          fontSize: 12,
        }}
      >
        <span
          style={{
            transition: '0.5s all',
            color: isValid ? colors.green : colors.lightPink,
          }}
        >
          ■
        </span>{' '}
        React Hook Form
      </p>
      <CircleButton title="Close dev panel" onClick={() => setVisible(false)}>
        ✕
      </CircleButton>
    </header>
  );
};

export default Header;

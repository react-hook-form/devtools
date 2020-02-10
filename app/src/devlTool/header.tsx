import colors from './colors';
import * as React from 'react';

type Props = {
  setVisible: (visible: boolean) => void;
};

export default ({ setVisible }: Props) => (
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
          color: colors.lightPink,
        }}
      >
        ■
      </span>{' '}
      Form Fields
    </p>
    <button
      onClick={() => setVisible(false)}
      style={{
        appearance: 'none',
        background: 'none',
        border: 'none',
        color: 'white',
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

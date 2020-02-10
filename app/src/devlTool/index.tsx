import * as React from 'react';
import { Control } from 'react-hook-form';
import Header from './header';
import Content from './panel';
import colors from './colors';

export default ({ control }: { control: Control }) => {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          height: '100vh',
          width: 250,
          zIndex: 99999,
          background: colors.primary,
          top: 0,
          right: 0,
          display: 'grid',
          textAlign: 'left',
          color: 'white',
          fontSize: 14,
          gridTemplateRows: '40px auto',
        }}
      >
        <Header />
        <Content control={control} />
      </div>
      <div
        style={{
          position: 'fixed',
          height: '100vh',
          width: 250,
          zIndex: 99998,
          background: 'black',
          top: 7,
          right: 7,
          boxShadow: 'rgba(15, 15, 29, 0.4) -3px 3px 6px 0px',
        }}
      />
      <span
        style={{
          width: 0,
          height: 0,
          position: 'fixed',
          zIndex: 99998,
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
          borderRight: `10px solid black`,
          right: 247,
          top: -3,
        }}
      />
    </>
  );
};

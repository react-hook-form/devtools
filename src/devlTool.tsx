import * as React from 'react';
import { Control } from 'react-hook-form';
import { Animate } from 'react-simple-animate';
import Header from './header';
import Panel from './panel';
import colors from './colors';
import Logo from './logo';
import { Button } from '../app/src/devlTool/styled';

export const DevTool = ({ control }: { control: Control }) => {
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <Animate
        play={!visible}
        duration={0.2}
        start={{
          position: 'fixed',
          top: 0,
          right: 0,
          transform: 'translateX(0)',
        }}
        end={{
          top: 0,
          right: 0,
          position: 'fixed',
          transform: 'translateX(280px)',
        }}
      >
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
          <Header setVisible={setVisible} control={control} />
          <Panel control={control} />
        </div>
        <Animate
          play={visible}
          duration={0.1}
          start={{
            transform: 'translateX(8px)',
          }}
          end={{
            transform: 'translateX(0)',
          }}
          delay={0.3}
        >
          <div>
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

            <span
              style={{
                width: 0,
                height: 0,
                position: 'fixed',
                zIndex: 99998,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderRight: `10px solid ${colors.buttonBlue}`,
                right: 247,
                top: 36,
              }}
            />
            <span
              style={{
                width: 10,
                height: 21,
                position: 'fixed',
                zIndex: 99998,
                right: 247,
                top: 48,
                background: colors.buttonBlue,
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
                borderLeft: `10px solid ${colors.buttonBlue}`,
                right: 247,
                top: 54,
              }}
            />
          </div>
        </Animate>
      </Animate>

      {!visible && (
        <Button
          title="Show dev panel"
          style={{
            position: 'fixed',
            zIndex: 99999,
            top: 3,
            right: 3,
            padding: 3,
            margin: 0,
            background: 'none',
          }}
        >
          <Logo setVisible={setVisible} />
        </Button>
      )}
    </>
  );
};

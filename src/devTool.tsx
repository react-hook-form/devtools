import * as React from 'react';
import { Control } from 'react-hook-form';
import { Animate } from 'react-simple-animate';
import Header from './header';
import Panel from './panel';
import colors from './colors';
import Logo from './logo';
import { PanelShadow } from './panelShadow';
import { Button } from './styled';

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
            background: colors.buttonBlue,
            top: 0,
            right: 0,
            display: 'grid',
            textAlign: 'left',
            color: 'white',
            fontSize: 14,
            gridTemplateRows: '40px auto',
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          }}
        >
          <Header setVisible={setVisible} control={control} />
          <Panel control={control} />
        </div>
        <PanelShadow visible={visible} />
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

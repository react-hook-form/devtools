import * as React from 'react';
import { Control } from 'react-hook-form';
import { Animate } from 'react-simple-animate';
import Header from './header';
import Panel from './panel';
import colors from './colors';
import Logo from './logo';
import defaultStyles from './defaultStyles';
import { PanelShadow } from './panelShadow';

export default ({ control }: { control: Control }) => {
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
          }}
        >
          <Header setVisible={setVisible} control={control} />
          <Panel control={control} />
        </div>
        <PanelShadow visible={visible} />
      </Animate>

      {!visible && (
        <button
          title="Show dev panel"
          style={{
            ...defaultStyles.button,
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
        </button>
      )}
    </>
  );
};

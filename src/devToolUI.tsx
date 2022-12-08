import * as React from 'react';
import { Control } from 'react-hook-form';
import { Animate } from 'react-simple-animate';

import Header from './header';
import Panel from './panel';
import colors from './colors';
import Logo from './logo';
import { Button } from './styled';
import { useStateMachine } from 'little-state-machine';
import { setVisible } from './settingAction';
import { PLACEMENT, getPositionByPlacement } from './position';

export interface DevtoolUIProps {
  control: Control<any>;
  placement?: PLACEMENT;
  /** Custom styles for the "show/hide panel" button and for the panel div */
  styles?: {
    /** Custom styles for the "show/hide panel" button */
    button?: React.HTMLAttributes<HTMLButtonElement>['style'];
    /** Custom styles for the panel div */
    panel?: React.HTMLAttributes<HTMLDivElement>['style'];
  };
}

export const DevToolUI: React.FC<DevtoolUIProps> = ({
  control,
  placement = 'top-right',
  styles,
}) => {
  const { state, actions } = useStateMachine({
    setVisible,
  });

  const position = getPositionByPlacement(placement, 0, 0);

  return (
    <>
      <Animate
        play={state.visible}
        duration={0.2}
        start={{
          ...position,
          position: 'fixed',
          transform: placement.includes('right')
            ? 'translateX(280px)'
            : 'translateX(-280px)',
          zIndex: 99999,
        }}
        end={{
          ...position,
          position: 'fixed',
          transform: 'translateX(0)',
          zIndex: 99999,
        }}
      >
        <div
          style={{
            ...position,
            position: 'fixed',
            height: '100vh',
            width: 250,
            zIndex: 99999,
            background: colors.buttonBlue,
            display: 'grid',
            textAlign: 'left',
            color: 'white',
            fontSize: 14,
            gridTemplateRows: '40px auto',
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
            ...styles?.panel,
          }}
        >
          <Header setVisible={actions.setVisible} control={control} />
          <Panel control={control} />
        </div>
      </Animate>

      {!state.visible && (
        <Button
          title="Show dev panel"
          hideBackground
          style={{
            position: 'fixed',
            zIndex: 99999,
            ...getPositionByPlacement(placement, 3, 3),
            padding: 3,
            margin: 0,
            background: 'none',
            ...styles?.button,
          }}
        >
          <Logo actions={actions} />
        </Button>
      )}
    </>
  );
};

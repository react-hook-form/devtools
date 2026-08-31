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
  const visibility = state.visible ? 'visible' : 'hidden';

  const showButtonRef = React.useRef<HTMLButtonElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const previousVisible = React.useRef(state.visible);

  // Toggling unmounts the button that was just used, which would drop keyboard
  // focus onto the body. Move it to the button that replaced it. Only on an
  // actual transition, so a panel that starts open never steals focus.
  React.useEffect(() => {
    if (previousVisible.current === state.visible) {
      return;
    }

    previousVisible.current = state.visible;
    (state.visible ? closeButtonRef : showButtonRef).current?.focus();
  }, [state.visible]);

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
            visibility,
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
          <Header
            setVisible={actions.setVisible}
            control={control}
            closeButtonRef={closeButtonRef}
          />
          <Panel control={control} />
        </div>
      </Animate>

      {!state.visible && (
        <Button
          ref={showButtonRef}
          aria-label="Show dev panel"
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
          type="button"
          onClick={() => actions.setVisible(true)}
        >
          <Logo />
        </Button>
      )}
    </>
  );
};

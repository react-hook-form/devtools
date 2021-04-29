import * as React from 'react';
import { Animate } from 'react-simple-animate';

import { PLACEMENT, getPositionByPlacement } from './position';
import colors from './colors';

type Props = {
  visible: boolean;
  placement: PLACEMENT;
};

export const PanelShadow = ({ visible, placement }: Props) => (
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
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        style={{
          ...getPositionByPlacement(placement, 7, 7),
          position: 'fixed',
          height: '100vh',
          width: 250,
          zIndex: 99998,
          background: 'black',
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
          ...getPositionByPlacement(placement, 247, -3),
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
          ...getPositionByPlacement(placement, 247, 37),
        }}
      />
      <span
        style={{
          width: 10,
          height: 21,
          position: 'fixed',
          zIndex: 99998,
          ...getPositionByPlacement(placement, 247, 47),
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
          ...getPositionByPlacement(placement, 247, 55),
        }}
      />
    </div>
  </Animate>
);

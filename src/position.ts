export type PLACEMENT =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export function getPositionByPlacement(
  placement: PLACEMENT,
  defaultX = 0,
  defaultY = 0,
) {
  const [x, y] = placement.split('-');
  return {
    [x]: defaultX,
    [y]: defaultY,
  };
}

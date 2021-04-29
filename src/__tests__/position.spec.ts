import { getPositionByPlacement } from '../position';

describe('Placement', () => {
  test('should get position by placement', () => {
    expect(getPositionByPlacement('top-left')).toEqual({
      top: 0,
      left: 0,
    });
  });
  test('should allow to set default position', () => {
    expect(getPositionByPlacement('top-right', 7, 10)).toEqual({
      top: 7,
      right: 10,
    });
  });
});

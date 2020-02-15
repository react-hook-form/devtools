import * as React from 'react';
import Logo from './logo';
import { render, fireEvent } from '@testing-library/react';

describe('Logo', () => {
  it('should invoke setVisible when click on the svg', () => {
    const setVisible = jest.fn();
    const { getByLabelText } = render(<Logo setVisible={setVisible} />);

    const element = getByLabelText('React Hook Form Logo');
    fireEvent.click(element);

    expect(setVisible).toBeCalled();
  });
});

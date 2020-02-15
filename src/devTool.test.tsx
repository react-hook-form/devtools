import * as React from 'react';
import DevTool from './devTool';
import { render, fireEvent } from '@testing-library/react';

describe('DevTool', () => {
  it('render correctly ', () => {
    // @ts-ignore
    const { getByTitle } = render(<DevTool control={{}} />);
    const button = getByTitle('Close dev panel');

    fireEvent.click(button);
  });
});

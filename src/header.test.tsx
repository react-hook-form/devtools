import * as React from 'react';
import Header from './header';
import { render } from '@testing-library/react';

describe('header', () => {
  it('should render correct color when form pass', () => {
    const methods = render(
      <Header
        setVisible={() => {}}
        // @ts-ignore
        control={{ formState: { isValid: true } }}
      />,
    );
    expect(methods.asFragment()).toMatchSnapshot();
  });

  it('should render correct when form failed', () => {
    const methods = render(
      <Header
        setVisible={() => {}}
        // @ts-ignore
        control={{ formState: { isValid: false } }}
      />,
    );
    expect(methods.asFragment()).toMatchSnapshot();
  });
});

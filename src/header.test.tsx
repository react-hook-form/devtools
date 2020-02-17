import * as React from 'react';
import Header from './header';
import { render } from '@testing-library/react';

describe('header', () => {
  it('should render correct color when form pass', () => {
    const methods = render(
      <Header
        setVisible={() => {}}
        control={{
          // @ts-ignore
          formState: { isValid: true },
          // @ts-ignore
          readFormStateRef: { current: {} },
        }}
      />,
    );
    expect(methods.asFragment()).toMatchSnapshot();
  });

  it('should render correct when form failed', () => {
    const methods = render(
      <Header
        setVisible={() => {}}
        control={{
          // @ts-ignore
          formState: { isValid: false },
          // @ts-ignore
          readFormStateRef: { current: {} },
        }}
      />,
    );
    expect(methods.asFragment()).toMatchSnapshot();
  });
});

/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import Header from './header';
import { render } from '@testing-library/react';

describe('header', () => {
  it('should render correct color when form pass', () => {
    const methods = render(
      <Header
        setVisible={() => {}}
        control={
          {
            formState: { isValid: true },
            readFormStateRef: { current: {} },
          } as any
        }
      />,
    );
    expect(methods.asFragment()).toMatchSnapshot();
  });

  it('should render correct when form failed', () => {
    const methods = render(
      <Header
        setVisible={() => {}}
        control={
          {
            formState: { isValid: false },
            readFormStateRef: { current: {} },
          } as any
        }
      />,
    );
    expect(methods.asFragment()).toMatchSnapshot();
  });
});

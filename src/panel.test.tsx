import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Panel from './panel';

jest.mock('lodash/get', () => ({
  default: () => {},
}));

describe('Panel', () => {
  it('should toggle expand all button', () => {
    const { getByTitle, getByText } = render(
      <Panel
        control={
          {
            getValues: () => {},
            fieldsRef: {
              current: {},
            },
            formState: {},
          } as any
        }
      />,
    );

    getByText('[-] COLLAPSE');

    fireEvent.click(getByTitle('Toggle entire fields'));

    getByText('[+] EXPAND');
  });
});

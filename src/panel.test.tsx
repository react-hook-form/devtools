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

  it('should map fields correctly', () => {
    const { asFragment } = render(
      <Panel
        control={
          {
            getValues: () => {},
            fieldsRef: {
              current: {
                test: {
                  ref: {
                    name: '1',
                    type: 'test',
                  },
                },
                test2: {
                  ref: {
                    name: '2',
                    type: 'test1',
                  },
                },
              },
            },
            fieldsValues: {},
            errorsRef: {
              current: {},
            },
            formState: {
              dirtyFields: new Set(),
            },
            readFormStateRef: { current: {} },
          } as any
        }
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

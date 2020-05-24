import * as React from 'react';
import { DevTool } from './devTool';
import { render } from '@testing-library/react';

describe('DevTool', () => {
  it('render correctly ', () => {
    // @ts-ignore
    const { asFragment } = render(
      <DevTool
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

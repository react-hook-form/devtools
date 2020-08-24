/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { DevTool } from './devTool';
import { render } from '@testing-library/react';

describe('DevTool', () => {
  it('render correctly ', () => {
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
            formState: {
              dirtyFields: {},
            },
            readFormStateRef: { current: {} },
          } as any
        }
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

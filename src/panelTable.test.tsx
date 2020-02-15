import * as React from 'react';
import { render } from '@testing-library/react';
import PanelTable from './panelTable';

jest.mock('lodash/isUndefined', () => ({ default: () => {} }));
jest.mock('lodash/isObject', () => ({ default: () => {} }));

describe('PanelTable', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <PanelTable
        isNative={false}
        errorMessage="test"
        errorType="test"
        hasError
        type="test"
        isTouched
        isDirty
        readFormStateRef={{ current: { touched: false } }}
        index={0}
        fieldsValues={{}}
        name="test"
        collapseAll={false}
        refObject={{}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

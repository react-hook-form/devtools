import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PanelTable from './panelTable';

describe('PanelTable', () => {
  it('should render collapsed', () => {
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

  it('should render string field values correctly', () => {
    const { getByTitle, getByTestId } = render(
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
        fieldsValues={{ test: 'RHF' }}
        name="test"
        collapseAll={false}
        refObject={{}}
      />,
    );

    fireEvent.click(getByTitle('Toggle field table'));

    expect(getByTestId('test-field-value').textContent).toBe('RHF');
  });

  it('should render number field values correctly', () => {
    const { getByTitle, getByTestId } = render(
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
        fieldsValues={{ test: 1234 }}
        name="test"
        collapseAll={false}
        refObject={{}}
      />,
    );

    fireEvent.click(getByTitle('Toggle field table'));

    expect(getByTestId('test-field-value').textContent).toBe('1234');
  });

  it('should render boolean field values correctly', () => {
    const { getByTitle, getByTestId } = render(
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
        fieldsValues={{ test: false }}
        name="test"
        collapseAll={false}
        refObject={{}}
      />,
    );

    fireEvent.click(getByTitle('Toggle field table'));

    expect(getByTestId('test-field-value').textContent).toBe('false');
  });

  it('should render null field values correctly', () => {
    const { getByTitle, getByTestId } = render(
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
        fieldsValues={{ test: null }}
        name="test"
        collapseAll={false}
        refObject={{}}
      />,
    );

    fireEvent.click(getByTitle('Toggle field table'));

    expect(getByTestId('test-field-value').textContent).toBe('null');
  });

  it('should render object field values correctly', () => {
    const { getByTitle, getByTestId } = render(
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
        fieldsValues={{ test: { deeply: { nested: 'value' } } }}
        name="test"
        collapseAll={false}
        refObject={{}}
      />,
    );

    fireEvent.click(getByTitle('Toggle field table'));

    expect(getByTestId('test-field-value').textContent).toMatchInlineSnapshot(`
      "{
        \\"deeply\\": {
          \\"nested\\": \\"value\\"
        }
      }"
    `);
  });

  it('should render non-serializable field values correctly', () => {
    const circular: any = {};
    circular.circular = circular;

    const { getByTitle, getByTestId } = render(
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
        fieldsValues={{ test: circular }}
        name="test"
        collapseAll={false}
        refObject={{}}
      />,
    );

    fireEvent.click(getByTitle('Toggle field table'));

    expect(getByTestId('test-field-value').textContent).toMatchInlineSnapshot(
      `"[Nested Object]"`,
    );
  });

  it('should not render undefined field values', () => {
    const { getByTitle, queryByTestId } = render(
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
        fieldsValues={{ test: undefined }}
        name="test"
        collapseAll={false}
        refObject={{}}
      />,
    );

    fireEvent.click(getByTitle('Toggle field table'));

    expect(queryByTestId('test-field-value')).toBeNull();
  });
});

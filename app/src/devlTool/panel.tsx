import * as React from 'react';
import get from 'lodash/get';
import { Control } from 'react-hook-form';
import { useEffect } from 'react';
import colors from './colors';
import PanelTable from './panelTable';
import FormStateTable from './formStateTable';
import defaultStyles from './defaultStyles';

export default ({
  control: { fieldsRef, getValues, formState, errorsRef, readFormStateRef },
}: {
  control: Control;
}) => {
  const [, setData] = React.useState({});
  const [collapseAll, setCollapseAll] = React.useState(true);
  const [showFormState, setShowFormState] = React.useState(false);
  const fieldsValues = getValues();

  useEffect(() => {
    setData({});
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '56px auto',
        height: 'calc(100vh - 40px)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `1fr 1fr`,
          gridTemplateRows: '28px 28px',
        }}
      >
        <button
          style={{
            ...defaultStyles.button,
            borderRight: `1px solid ${colors.primary}`,
            textTransform: 'none',
          }}
          onClick={() => setData({})}
        >
          ♺ UPDATE
        </button>
        <button
          style={{
            ...defaultStyles.button,
            borderRight: `1px solid ${colors.primary}`,
            textTransform: 'none',
          }}
          onClick={() => setCollapseAll(!collapseAll)}
        >
          {collapseAll ? '[-] COLLAPSE' : '[+] EXPAND'}
        </button>

        <input
          style={{
            display: 'inline-block',
            borderRadius: 0,
            width: '100%',
            margin: 0,
            padding: '5px 10px',
            WebkitAppearance: 'none',
            appearance: 'none',
            fontSize: 14,
            border: 0,
            color: 'white',
            gridColumnStart: 1,
            gridColumnEnd: 4,
            background: 'black',
          }}
          placeholder="Filter name..."
          type="search"
        />
      </div>

      <div
        style={{
          overflow: 'auto',
        }}
      >
        {Object.entries(fieldsRef.current).map(([name, value], index) => {
          const error = get(errorsRef.current, name);
          const errorMessage = get(error, 'message', undefined);
          const errorType = get(error, 'type', undefined);
          const type = get(value, 'ref.type', undefined);
          const isTouched = !!get(formState.touched, name);
          const isNative = (value as any).ref.type;
          const isDirty = formState.dirtyFields.has(name);
          const hasError = !!error;
          const ref = get(value, 'ref');

          return (
            <section
              key={`${name}${index}`}
              style={{
                borderBottom: `1px dashed ${colors.secondary}`,
                margin: 0,
              }}
            >
              <PanelTable
                refObject={ref}
                index={index}
                collapseAll={collapseAll}
                name={name}
                isTouched={isTouched}
                type={type}
                hasError={hasError}
                isNative={isNative}
                errorMessage={errorMessage}
                errorType={errorType}
                readFormStateRef={readFormStateRef}
                isDirty={isDirty}
                fieldsValues={fieldsValues}
              />
            </section>
          );
        })}
      </div>

      <FormStateTable
        formState={formState}
        showFormState={showFormState}
        setShowFormState={setShowFormState}
      />
    </div>
  );
};

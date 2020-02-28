import * as React from 'react';
import get from 'lodash/get';
import { Control, useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { useEffect } from 'react';
import colors from './colors';
import PanelTable from './panelTable';
import FormStateTable from './formStateTable';
import { Button, Input } from './styled';
import { setCollapse } from './settingAction';

export default ({
  control: { fieldsRef, getValues, formState, errorsRef, readFormStateRef },
}: {
  control: Control;
}) => {
  const { state, action } = useStateMachine(setCollapse);
  const [, setData] = React.useState({});
  const [showFormState, setShowFormState] = React.useState(false);
  const fieldsValues = getValues();
  const { register, watch } = useForm();
  const searchTerm = watch('search', '');

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
        <Button
          style={{
            borderRight: `1px solid ${colors.primary}`,
            textTransform: 'none',
            fontSize: 11,
            lineHeight: 1,
          }}
          title="Update values and state the form"
          onClick={() => setData({})}
        >
          ♺ UPDATE
        </Button>
        <Button
          style={{
            borderRight: `1px solid ${colors.primary}`,
            textTransform: 'none',
            fontSize: 11,
            lineHeight: 1,
          }}
          title="Toggle entire fields"
          onClick={() => {
            // @ts-ignore
            action(!state.isCollapse);
          }}
        >
          {state.isCollapse ? '[-] COLLAPSE' : '[+] EXPAND'}
        </Button>

        <Input
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
          name="search"
          ref={register}
          placeholder="Filter name..."
          type="search"
        />
      </div>

      <div
        style={{
          overflow: 'auto',
        }}
      >
        {Object.entries(fieldsRef.current)
          .filter(
            ([name]) =>
              ((name &&
                name.toLowerCase &&
                name.toLowerCase().includes(searchTerm)) ||
                (!name && !searchTerm) ||
                searchTerm === '') &&
              name,
          )
          .map(([name, value], index) => {
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
                  collapseAll={state.isCollapse}
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

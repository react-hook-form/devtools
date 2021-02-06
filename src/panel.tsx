import * as React from 'react';
import { Control, useForm, useWatch, useFormState, get } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { useEffect } from 'react';
import colors from './colors';
import PanelTable from './panelTable';
import FormStateTable from './formStateTable';
import { Button, Input } from './styled';
import { setCollapse } from './settingAction';

export default ({ control, control: { fieldsRef } }: { control: Control }) => {
  const formState = useFormState();
  const { dirtyFields, touchedFields, errors } = formState;
  const { state, actions } = useStateMachine({
    setCollapse,
  });
  const [, setData] = React.useState({});
  const [showFormState, setShowFormState] = React.useState(false);
  const fieldsValues = useWatch({
    control,
  });
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
        height:
          process.env.NODE_ENV === 'test' ? '100vh' : 'calc(100vh - 40px)',
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
            actions.setCollapse(!state.isCollapse);
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
          {...register('search')}
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
            const error = get(errors, name);
            const errorMessage = get(error, 'message', undefined);
            const errorType = get(error, 'type', undefined);
            const type = get(value, 'ref.type', undefined);
            const isTouched = !!get(touchedFields, name);
            const isNative = !!(value && value._f.ref.type);
            const isDirty = !!get(dirtyFields, name);
            const hasError = !!error;
            const ref = get(value, '_f.ref');

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

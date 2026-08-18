import * as React from 'react';
import { useEffect } from 'react';
import { Control, useForm, useWatch, useFormState, get } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';

import colors from './colors';
import PanelTable from './panelTable';
import FormStateTable from './formStateTable';
import { Button, Input } from './styled';
import { setCollapse } from './settingAction';

let childIndex = 0;

function PanelChildren<T, K, L, M, G>({
  fields,
  searchTerm,
  touchedFields,
  errors,
  dirtyFields,
  state,
  fieldsValues,
  fieldCollapseStates,
  toggleFieldCollapse,
}: {
  fields: T;
  fieldsValues: K;
  state: {
    isCollapse: boolean;
  };
  searchTerm: string;
  touchedFields: M;
  errors: L;
  dirtyFields: G;
  fieldCollapseStates: Record<string, boolean>;
  toggleFieldCollapse: (fieldName: string) => void;
}) {
  return (
    <>
      {fields &&
        Object.entries(fields)
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
            childIndex++;

            if (!value?._f) {
              return (
                <PanelChildren
                  key={name + childIndex}
                  {...{
                    fields: value,
                    searchTerm,
                    touchedFields,
                    errors,
                    dirtyFields,
                    state,
                    fieldsValues,
                    fieldCollapseStates,
                    toggleFieldCollapse,
                  }}
                />
              );
            } else {
              const error = get(errors, value._f.name);
              const errorMessage = get(error, 'message', undefined);
              const errorType = get(error, 'type', undefined);
              const type = get(value, 'ref.type', undefined);
              const isTouched = !!get(touchedFields, value._f.name);
              const isNative = !!(value && value._f.ref.type);
              const isDirty = !!get(dirtyFields, value._f.name);
              const hasError = !!error;
              const ref = get(value, '_f.ref');

              return (
                <section
                  key={value?._f.name + childIndex}
                  style={{
                    borderBottom: `1px dashed ${colors.secondary}`,
                    margin: 0,
                  }}
                >
                  <PanelTable
                    refObject={ref}
                    index={index}
                    collapseAll={state.isCollapse}
                    name={value?._f.name}
                    isTouched={isTouched}
                    type={type}
                    hasError={hasError}
                    isNative={isNative}
                    errorMessage={errorMessage}
                    errorType={errorType}
                    isDirty={isDirty}
                    fieldsValues={fieldsValues}
                    isFieldCollapsed={
                      fieldCollapseStates[value?._f.name] ?? state.isCollapse
                    }
                    onToggleCollapse={() => toggleFieldCollapse(value?._f.name)}
                  />
                </section>
              );
            }
          })}
    </>
  );
}

const Panel = ({ control, control: { _fields } }: { control: Control }) => {
  const formState = useFormState({
    control,
  });
  const { dirtyFields, touchedFields, errors } = formState;
  formState.isDirty;
  const { state, actions } = useStateMachine({
    setCollapse,
  });
  const [, setData] = React.useState({});
  const [showFormState, setShowFormState] = React.useState(false);
  const [fieldCollapseStates, setFieldCollapseStates] = React.useState<
    Record<string, boolean>
  >({});

  const toggleFieldCollapse = React.useCallback(
    (fieldName: string) => {
      setFieldCollapseStates((prev) => {
        const currentState = prev[fieldName] ?? state.isCollapse;
        const newState = !currentState;
        const updatedStates = {
          ...prev,
          [fieldName]: newState,
        };

        return updatedStates;
      });
    },
    [state.isCollapse],
  );

  const setAllFieldsCollapse = React.useCallback((isCollapsed: boolean) => {
    setFieldCollapseStates((prev) =>
      Object.fromEntries(
        Object.keys(prev).map((fieldName) => [fieldName, isCollapsed]),
      ),
    );
  }, []);
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
          type="button"
        >
          ♺ REFRESH
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
            const newCollapseState = !state.isCollapse;
            actions.setCollapse(newCollapseState);
            setAllFieldsCollapse(newCollapseState);
          }}
          type="button"
        >
          {state.isCollapse ? '[+] EXPAND' : '[-] COLLAPSE'}
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
        <PanelChildren
          fields={_fields}
          searchTerm={searchTerm}
          errors={errors}
          touchedFields={touchedFields}
          dirtyFields={dirtyFields}
          fieldsValues={fieldsValues}
          state={state}
          fieldCollapseStates={fieldCollapseStates}
          toggleFieldCollapse={toggleFieldCollapse}
        />
      </div>

      <FormStateTable
        formState={formState}
        showFormState={showFormState}
        setShowFormState={setShowFormState}
      />
    </div>
  );
};

export default Panel;

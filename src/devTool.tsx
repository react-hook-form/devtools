import * as React from 'react';
import { StateMachineProvider, createStore } from 'little-state-machine';
import { Control, useFormContext } from 'react-hook-form';
import { DevToolUI } from './devToolUI';
import type { PLACEMENT } from './position';

if (typeof window !== 'undefined') {
  createStore(
    {
      visible: true,
      isCollapse: false,
      filterName: '',
    },
    {
      name: '__REACT_HOOK_FORM_DEVTOOLS__',
      middleWares: [],
      storageType: window.localStorage,
    },
  );
}

export const DevTool = (props?: {
  control?: Control<any>;
  placement?: PLACEMENT;
}) => {
  const methods = useFormContext();

  return (
    <StateMachineProvider>
      <DevToolUI
        control={(props && props.control) || methods.control}
        placement={props?.placement}
      />
    </StateMachineProvider>
  );
};

export type { PLACEMENT };

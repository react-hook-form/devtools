import * as React from 'react';
import { StateMachineProvider, createStore } from 'little-state-machine';
import { Control } from 'react-hook-form';
import { DevToolUI } from './devToolUI';

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

export const DevTool = ({ control }: { control: Control<any> }) => {
  return (
    <StateMachineProvider>
      <DevToolUI control={control} />
    </StateMachineProvider>
  );
};

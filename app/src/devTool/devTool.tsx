import * as React from 'react';
import {
  StateMachineProvider,
  createStore,
  setStorageType,
} from 'little-state-machine';
import { Control } from 'react-hook-form';
import { DevToolUI } from './devToolUI';

setStorageType(window.localStorage);

createStore({
  visible: true,
  isCollapse: false,
  filterName: '',
}, {
  name: "__REACT_HOOK_FORM_DEVTOOLS__"
});

export const DevTool = ({ control }: { control: Control }) => {
  return (
    <StateMachineProvider>
      <DevToolUI control={control} />
    </StateMachineProvider>
  );
};

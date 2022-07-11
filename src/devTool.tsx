import { createStore, StateMachineProvider } from 'little-state-machine';
import * as React from 'react';
import { Control, FieldValues, useFormContext } from 'react-hook-form';
import { DevToolUI } from './devToolUI';
import { useExportControlToExtension } from './extension/useExportControlToExtension';
import type { PLACEMENT } from './position';

if (typeof window !== 'undefined') {
  createStore(
    {
      visible: false,
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

export const DevTool = <T extends FieldValues>(props?: {
  control?: Control<T>;
  placement?: PLACEMENT;
}) => {
  const methods = useFormContext();

  const { isExtensionEnabled } = useExportControlToExtension(
    props?.control ?? methods.control,
  );
  if (isExtensionEnabled) {
    return null;
  }

  return (
    <StateMachineProvider>
      <DevToolUI
        control={props?.control ?? methods.control}
        placement={props?.placement}
      />
    </StateMachineProvider>
  );
};

export type { PLACEMENT };

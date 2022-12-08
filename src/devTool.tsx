import { createStore, StateMachineProvider } from 'little-state-machine';
import * as React from 'react';
import { Control, FieldValues, useFormContext } from 'react-hook-form';
import { v4 as generateUUID } from 'uuid';
import { DevToolUI, DevtoolUIProps } from './devToolUI';
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

export const DevTool = <T extends FieldValues>(
  props?: {
    id?: string;
    control?: Control<T>;
  } & Pick<DevtoolUIProps, 'placement' | 'styles'>,
) => {
  const methods = useFormContext();

  const uuid = React.useRef('');

  React.useEffect(() => {
    uuid.current = generateUUID();
  }, []);

  const { isExtensionEnabled } = useExportControlToExtension({
    id: props?.id ?? uuid.current,
    control: props?.control ?? methods.control,
  });
  if (isExtensionEnabled) {
    return null;
  }

  return (
    <StateMachineProvider>
      <DevToolUI
        control={props?.control ?? methods.control}
        placement={props?.placement}
        styles={props?.styles}
      />
    </StateMachineProvider>
  );
};

export type { PLACEMENT };

import _ from 'lodash';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { Control, useFormState, useWatch } from 'react-hook-form';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { MessageData, UpdatePayload } from './types';
import { nestToFlat, proxyToObject } from './utils';

const id = nanoid();

export function useExportControlToExtension(control: Control<any>) {
  const nestedFormValues = useWatch({ control });
  const formState = useFormState({ control });

  const [isExtensionEnabled, setIsExtensionEnabled] = useState(false);

  const handleInitMessage = (message: MessageEvent<MessageData>) => {
    if (
      message.data.source !== 'react-hook-form-bridge' ||
      message.data.type !== 'INIT'
    ) {
      return;
    }
    window.postMessage({
      source: 'react-hook-form-bridge',
      type: 'WELCOME',
    } as MessageData);
    setIsExtensionEnabled(true);
  };

  useEffect(() => {
    window.addEventListener('message', handleInitMessage);
    return () => window.removeEventListener('message', handleInitMessage);
  }, []);

  useDeepCompareEffect(() => {
    if (!isExtensionEnabled) {
      return;
    }

    const {
      errors: nestedErrors,
      dirtyFields: nestedDirtyFields,
      touchedFields: nestedTouchedFields,
      ...formStatus
    } = proxyToObject(formState);

    const flatFieldNames = [...control._names.mount];

    const formValues = nestToFlat(flatFieldNames, nestedFormValues, '');
    const dirtyFields = nestToFlat(flatFieldNames, nestedDirtyFields, false);
    const touchedFields = nestToFlat(
      flatFieldNames,
      nestedTouchedFields,
      false,
    );
    const flatErrors = nestToFlat<{ type?: string; message?: string }>(
      flatFieldNames,
      nestedErrors,
    );

    const errors = Object.entries(flatErrors).reduce((perv, [key, value]) => {
      perv[key] = {
        type: value?.type as string,
        message: value?.message as string,
      };
      return perv;
    }, {} as Record<string, { type?: string; message?: string }>);

    const nativeFields = flatFieldNames.reduce((perv, name) => {
      perv[name] = !!_.get(control._fields, name)?._f?.ref?.type;
      return perv;
    }, {} as Record<string, boolean>);

    const updateMessagePayload: UpdatePayload = {
      id,
      data: {
        formValues,
        formState: {
          errors,
          dirtyFields,
          touchedFields,
          nativeFields,
          ...formStatus,
        },
      },
    };
    window.postMessage({
      source: 'react-hook-form-bridge',
      type: 'UPDATE',
      payload: updateMessagePayload,
    } as MessageData);
  }, [isExtensionEnabled, nestedFormValues, proxyToObject(formState)]);

  return { isExtensionEnabled };
}

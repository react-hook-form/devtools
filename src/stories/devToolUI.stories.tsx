import React from 'react';
import { Story, Meta } from '@storybook/react';
import { StateMachineProvider, createStore } from 'little-state-machine';
import { Control, useForm } from 'react-hook-form';

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

import { DevToolUI } from '../devToolUI';
import { PLACEMENT } from '../position';

type Props = {
  placement?: PLACEMENT;
};

export default {
  title: 'DevToolUI',
  component: DevToolUI,
} as Meta;

const Template: Story<Props> = (args) => {
  const { register, control, reset, handleSubmit } = useForm<{
    firstName: string;
    test: {
      nested: string;
    };
  }>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
    },
  });

  return (
    <StateMachineProvider>
      <form onSubmit={handleSubmit((data) => data)}>
        <h1>
          <span role="img" aria-label="devTool">
            🔧
          </span>{' '}
          DevTools
        </h1>
        <p style={{ textAlign: 'center' }}>
          React Hook Form DevTools to help debug forms.
        </p>
        <label>First Name</label>
        <input {...register('firstName', { required: true })} />
        <input {...register('test.nested', { required: true })} />
        <button
          type={'button'}
          onClick={() => {
            reset({});
          }}
        >
          reset
        </button>
        <input style={{ fontWeight: 400 }} type="submit" />
      </form>

      <DevToolUI {...args} control={control as Control<any>} />
    </StateMachineProvider>
  );
};

export const DefaultDevTool = Template.bind({});
DefaultDevTool.args = {
  placement: 'top-right',
};

export const TopLeftDevTool = Template.bind({});
TopLeftDevTool.args = {
  placement: 'top-left',
};

export const BottomRightDevTool = Template.bind({});
BottomRightDevTool.args = {
  placement: 'bottom-right',
};

export const BottomLeftDevTool = Template.bind({});
BottomLeftDevTool.args = {
  placement: 'bottom-left',
};

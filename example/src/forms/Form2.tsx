import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '../../../src/devTool';

const Form2: React.FC = () => {
  const { control, handleSubmit, register } = useForm({
    defaultValues: { lol: '', olo: '' },
  });

  return (
    <>
      <form onSubmit={handleSubmit((data) => data)}>
        <input {...register('lol', { required: true })} />
        <input {...register('olo', { required: true })} />
        <input style={{ fontWeight: 400 }} type="submit" />
      </form>
      <DevTool control={control} />
    </>
  );
};

export default Form2;

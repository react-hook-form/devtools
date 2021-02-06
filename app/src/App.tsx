import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from './devTool';
import './App.css';

const App = () => {
  const { register, control, handleSubmit } = useForm<{
    firstName: string;
    lastName: string;
    custom: string;
  }>({
    mode: 'onChange',
  });

  React.useEffect(() => {
    register('custom');
  }, [register]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(d => console.log(d))}>
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

        <label>Last Name</label>
        <input {...register('lastName', { required: true })} />

        <input style={{ fontWeight: 400 }} type="submit" />
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default App;

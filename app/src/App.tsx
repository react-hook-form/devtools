import React from 'react';
import { useForm } from 'react-hook-form';
import DevTool from './devlTool';
import './App.css';

const App = () => {
  const { register, control, handleSubmit, formState } = useForm<{
    test: string;
    test1: string;
    custom: string;
  }>({
    mode: 'onChange',
  });

  React.useEffect(() => {
    register('custom');
  }, [register]);

  console.log('app', formState.touched);
  console.log('app', formState.dirtyFields);
  console.log('app', formState.isValid);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(d => console.log(d))}>
        <h1>React Hook Form DevTools</h1>
        <label>First Name</label>
        <input name="test1" ref={register({ required: true })} />
        <label>Last Name</label>
        <input name="test2" ref={register({ required: true })} />
        <input type="submit" />
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default App;

import React from 'react';
import { useForm } from 'react-hook-form';
import DevTool from './devlTool';
import logo from './logo.svg';
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
    register('custom1');
    register('custom2');
    register('custom3');
    register('custom4');
  }, [register]);

  console.log('app', formState.touched);
  console.log('app', formState.dirtyFields);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(d => console.log(d))}>
        <h1>React Hook Form DevTools</h1>
        <label>Test</label>
        <input name="test" ref={register} />
        <label>Test1</label>
        <input name="test1" ref={register({ required: true })} />
        <input type="submit" />
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default App;

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

  console.log('app', formState.touched)
  console.log('app', formState.dirtyFields)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit(d => console.log(d))}>
          <input name="test" ref={register} />
          <input name="test1" ref={register({ required: true })} />
          <button>Test</button>
        </form>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <DevTool control={control} />
    </div>
  );
};

export default App;

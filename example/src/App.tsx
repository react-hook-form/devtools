import React from 'react';
import { Router, Link, RouteComponentProps } from '@reach/router';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import type { PLACEMENT } from '@hookform/devtools';
import './App.css';

const Form = ({
  placement = 'top-right',
}: RouteComponentProps<{
  placement: PLACEMENT;
}>) => {
  const { register, control, handleSubmit } = useForm<{
    firstName: string;
    lastName: string;
    custom: string;
    ha: {
      test: string;
    };
  }>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      ha: {
        test: '',
      },
    },
  });

  React.useEffect(() => {
    register('custom');
  }, [register]);

  console.warn({ placement });
  return (
    <>
      <form onSubmit={handleSubmit(console.warn)}>
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
        <input {...register('ha.test', { required: true })} />

        <label>Last Name</label>
        <input {...register('lastName', { required: true })} />

        <input style={{ fontWeight: 400 }} type="submit" />
      </form>

      <DevTool control={control} placement={placement as PLACEMENT} />
    </>
  );
};

const App = () => {
  return (
    <div className="App">
      <nav>
        <Link to="/">Default</Link>
        <Link to="placement/top-left">Top Left</Link>
        <Link to="placement/bottom-left">Bottom Left</Link>
        <Link to="placement/bottom-right">Bottom Right</Link>
      </nav>
      <Router>
        <Form path="/" />
        <Form path="placement/:placement" />
      </Router>
    </div>
  );
};

export default App;

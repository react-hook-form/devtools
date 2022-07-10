import type { PLACEMENT } from '@hookform/devtools';
import { DevTool } from '@hookform/devtools';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import './App.css';

const Form: React.FC = () => {
  const params = useParams();

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

  return (
    <>
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
        <input {...register('ha.test', { required: true })} />

        <label>Last Name</label>
        <input {...register('lastName', { required: true })} />

        <input style={{ fontWeight: 400 }} type="submit" />
      </form>

      <DevTool
        control={control}
        placement={(params?.placement as PLACEMENT) ?? 'top-right'}
      />
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
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="placement/:placement" element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;

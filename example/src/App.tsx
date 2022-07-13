import React from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { PLACEMENT } from '../../src/position';
import './App.css';
import Form1 from './forms/Form1';
import Form2 from './forms/Form2';

const Page: React.FC<{ multiple?: boolean }> = ({ multiple }) => {
  const params = useParams();
  return (
    <>
      <h1>
        <span role="img" aria-label="devTool">
          🔧
        </span>{' '}
        DevTools
      </h1>
      <p style={{ textAlign: 'center' }}>
        React Hook Form DevTools to help debug forms.
      </p>
      <Form1 placement={params?.placement as PLACEMENT} />
      {multiple && <Form2 />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <Link to="/">Default</Link>
        <Link to="placement/top-left">Top Left</Link>
        <Link to="placement/bottom-left">Bottom Left</Link>
        <Link to="placement/bottom-right">Bottom Right</Link>
        <Link to="multiple">Multiple</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="placement/:placement" element={<Page />} />
        <Route path="multiple" element={<Page multiple />} />
      </Routes>
    </div>
  );
};

export default App;

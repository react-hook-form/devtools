<div align="center">
    <p align="center">
        <a href="https://react-hook-form.com" title="React Hook Form - Simple React forms validation">
            <img src="https://raw.githubusercontent.com/bluebill1049/react-hook-form/master/docs/logo.png" alt="React Hook Form Logo - React hook custom hook for form validation" />
        </a>
    </p>
</div>

<p align="center">Performant, flexible and extensible forms with easy to use validation.</p>

<div align="center">

[![npm downloads](https://img.shields.io/npm/dm/@hookform/devtools.svg?style=for-the-badge)](https://www.npmjs.com/package/@hookform/devtools)
[![npm](https://img.shields.io/npm/dt/@hookform/devtools.svg?style=for-the-badge)](https://www.npmjs.com/package/@hookform/devtools)
[![npm](https://img.shields.io/bundlephobia/minzip/@hookform/devtools?style=for-the-badge)](https://bundlephobia.com/result?p=@hookform/devtools)

</div>

<img src="https://react-hook-form.com/static/dev-tool-5b2a4d10769a292c6f1ca78a6170e4db.png" />

## Goal

This React Component will help you to debug forms when working React Hook Form, and give you more insight about your form's detail.

## Install

    $ npm install @hookform/devtools -D

## Quickstart

```typescript jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import './App.css';

const App = () => {
  const { register, control, handleSubmit } = useForm({
    mode: 'onChange',
  });

  return (
    <>
      <DevTool control={control} placement="top-left" />

      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <h1>React Hook Form DevTools</h1>

        <label>Test</label>
        <input name="test" ref={register} />

        <input type="submit" />
      </form>
    </>
  );
};

export default App;
```

## Backers

Thanks goes to all our backers! [[Become a backer](https://opencollective.com/react-hook-form#backer)].

<a href="https://opencollective.com/react-hook-form#backers">
    <img src="https://opencollective.com/react-hook-form/backers.svg?width=950" />
</a>

## Organizations

Thanks goes to these wonderful organizations! [[Contribute](https://opencollective.com/react-hook-form/contribute)].

<a href="https://github.com/react-hook-form/react-hook-form/graphs/contributors">
    <img src="https://opencollective.com/react-hook-form/organizations.svg?width=950" />
</a>

## Contributors

Thanks goes to these wonderful people! [[Become a contributor](https://github.com/react-hook-form/react-hook-form/blob/master/CONTRIBUTING.md)].

<a href="https://github.com/react-hook-form/react-hook-form/graphs/contributors">
    <img src="https://opencollective.com/react-hook-form/contributors.svg?width=950" />
</a>

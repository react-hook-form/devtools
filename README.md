<div align="center">
    <p align="center">
        <a href="https://react-hook-form.com" title="React Hook Form - Simple React forms validation">
            <img src="https://raw.githubusercontent.com/bluebill1049/react-hook-form/master/website/logo.png" alt="React Hook Form Logo - React hook custom hook for form validation" width="300px" />
        </a>
    </p>
</div>

<p align="center">Performant, flexible and extensible forms with easy to use validation.</p>

<div align="center">

[![npm downloads](https://img.shields.io/npm/dm/react-hook-form-devtools.svg?style=for-the-badge)](https://www.npmjs.com/package/react-hook-form-devtools)
[![npm](https://img.shields.io/npm/dt/react-hook-form-devtools.svg?style=for-the-badge)](https://www.npmjs.com/package/react-hook-form-devtools)
[![npm](https://img.shields.io/bundlephobia/minzip/react-hook-form-devtools?style=for-the-badge)](https://bundlephobia.com/result?p=react-hook-form)

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React+hooks+for+form+validation+without+the+hassle&url=https://github.com/bluebill1049/react-hook-form-devtools)&nbsp;[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/react-hook-form)

</div>

<img src="https://raw.githubusercontent.com/react-hook-form/react-hook-form-devtools/master/app/screen.png" />

## Goal

This React Component will help you to debug forms when working React Hook Form, and give you more insight about your form's detail.

## Install

    $ npm install react-hook-form-devtools -D

## Quickstart

```typescript jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from 'react-hook-form-devtools';
import './App.css';

const App = () => {
  const { register, control, handleSubmit } = useForm({
    mode: 'onChange',
  });

  return (
    <>
      {process.env.NODE_ENV !== 'production' && <DevTool control={control} />}

      <form onSubmit={handleSubmit(d => console.log(d))}>
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

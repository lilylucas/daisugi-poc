# @daisugi/kado

Kado is a minimal and unobtrusive inversion of control container.

## Usage

```javascript
const { kado } = require('@daisugi/kado');

const { container } = kado();

class Foo {
  constructor(bar) {
    this.bar = bar;
  }
}

class B {}

container.register([
  {
    token: 'Foo',
    useClass: Foo,
    params: ['Bar'],
  },
  {
    token: 'Bar',
    useClass: Bar,
  },
]);

const foo = container.resolve('Foo');
```

## Table of contents

- [@daisugi/kado](#daisugikado)
  - [Usage](#usage)
  - [Install](#install)
  - [Motivation](#motivation)
  - [API](#api)
    - [token](#token)
    - [useClass](#useclass)
    - [useValue](#usevalue)
    - [useFactory](#usefactory)
    - [useFactoryWithParams](#usefactorywithparams)
    - [scope](#scope)
    - [#list()](#list)
  - [Goal](#goal)
  - [FAQ](#faq)
    - [Where does the name come from?](#where-does-the-name-come-from)
  - [License](#license)

## Install

Using npm:

```sh
npm install @daisugi/kado
```

Using yarn:

```sh
yarn add @daisugi/kado
```

## Motivation

This library is a result of a series of the requirements that either were not met by other libraries of same type, or were partially met, or finally met everything but also brought an overhead not required by the project.

If you feel that any of the following requirements is close to your demand, feel free to use this library, otherwise there are many other good IoC libraries out there such as [di-ninja](https://github.com/di-ninja/di-ninja) or [tsyringe](https://github.com/microsoft/tsyringe), among many others that you can use.

- ✅ Should allow to create multiple instances of the container, and not share the state globally (useful when multiple packages are using it, or in monorepo).
- ✅ The DI configuration must be abstracted from the base code, and must be able to be easily ported (Composition Root).
- ✅ Dependencies must be able easily decorated (useful to add telemetry, debug ...).
- ✅ Avoid using decorators by annotations (see [STYLE_GUIDE.md](../../STYLE_GUIDE.md) pt.21).
- ✅ Keep the API simple (singleton and not, classes, values, factories, and not much more), but with enough pieces to cover the most common use cases.

## API

### token

Is the name used to register the dependency, to later be resolved.

### useClass

Can go along with `params` property, which contains `tokens` with which the class should be resolved.

#### Usage

```javascript
const { kado } = require('@daisugi/kado');

const { container } = kado();

class Foo {
  constructor(bar) {
    this.bar = bar;
  }
}

class Bar {}

container.register([
  {
    token: 'Foo',
    useClass: Foo,
    params: ['Bar'],
  },
  {
    token: 'Bar',
    useClass: Bar,
  },
]);

const foo = container.resolve('Foo');
```

### useValue

Useful for storing constants.

#### Usage

```javascript
const { kado } = require('@daisugi/kado');

const { container } = kado();

container.register([
  {
    token: 'foo',
    useValue: 'text',
  },
]);

const foo = container.resolve('foo');
```

### useFactory

Provides `container` as argument to the factory method.

#### Usage

```javascript
const { kado } = require('@daisugi/kado');

const { container } = kado();

class Foo {}

function bar(c) {
  return c.resolve('Foo');
}

container.register([
  {
    token: 'Foo',
    useClass: Foo,
  },
  {
    token: 'bar',
    useFactory: bar,
  },
]);

const foo = container.resolve('bar');
```

### useFactoryWithParams

Same as `useFactory`, except provides `params` to it, instead of the `container`.

#### Usage

```javascript
const { kado } = require('@daisugi/kado');

const { container } = kado();

class Foo {}

function bar(foo) {
  return foo;
}

container.register([
  {
    token: 'Foo',
    useClass: Foo,
  },
  {
    token: 'bar',
    useFactoryWithParams: bar,
    params: ['Foo'],
  },
]);

const foo = container.resolve('bar');
```

### scope

Scope can be `Transient` or `Singleton`, by default it's `Singleton`. Can be used along with `useClass`, `useFactory` and `useFactoryWithParams`. Having scope as `Transient` it will create a new instance every time the dependency is resolved, `Singleton` will reuse the already created instance.

#### Usage

```javascript
const { kado } = require('@daisugi/kado');

const { container } = kado();

class Foo {}

container.register([
  {
    token: 'Foo',
    useClass: Foo,
    scope: 'Transient',
  },
]);

const foo = container.resolve('Foo');
```

### #list()

Get the list of the registered dependencies.

#### Usage

```javascript
const { kado } = require('@daisugi/kado');

const { container } = kado();

class Foo {}

container.register([
  {
    token: 'Foo',
    useClass: Foo,
    scope: 'Transient',
  },
]);

const manifest = container.list();

// Now you can iterate the manifest items and decorate methods.
```

## Goal

The project aims to provide the basic functionality for IoC. The functionality will be kept simple and will not be overextended.

## FAQ

### Where does the name come from?

Kado is a Japanese art that involves an arrangement of a variety of plants. A characteristic of Japanese Kado is an emphasis on shapes and lines, as well as the manner in which the flower is placed into the dish.

## License

[MIT](../../LICENSE)
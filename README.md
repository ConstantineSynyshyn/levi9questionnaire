# Levi9 Questionnaire

## Description

Levi9 questionnaire is an application bootstrapped with `create-next-app` and is intended to use for cantidate testing.

## Stack / main tech

- next
- react
- react-dom
- material/ui
- styled-components
- mongoDB

## Installation and run

Running application for development purposes doesn't require any additional setup, so it is easy as:

```shell
$ yarn

$ yarn dev
```

## Registration

App is designed for passwordless login, so you should be registered and loged in via registration link.
However, you can achieve the same result calling:

```shell
${appBaseUrl}/registration/${yourEmailHere}
```

## Testing strategy

`React testing library` was choosen due to it's very light-weight and since it emphasizes testing without all the implementation details.
`Jest` was choosen as a testing environment since it is extremely fast and efficient.
Running your tests is as easy as:

```shell
$ yarn test
```

For more info see `package.json` scripts.

## NextJS

Being a fullstack framework NextJs dictates its own structure.
By default, Next.js [pre-renders every page](https://nextjs.org/docs/basic-features/pages#pre-rendering).
We chose the hybrid model. We are obliged to use the BFF in order to pre-fetch the data required for meaningful render.
Then the document gets loaded to the client's device and application will act as a SPA, allowing for client-side navigation. (i.e. Universal Web App)

## Code structure

Currently every single page lives within `src/pages` folder. If new page has to be created - it should be done within `pages` folder with the following structure (default export is obligatory):

```shell
function Example() {
  return <SampleComponent>Sample page</SampleComponent>
}
export default Example;
```

## Styling

Despite the fact NextJs supports css modules out of the box we are sticking to `css in js`.

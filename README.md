# CoC7 Tests Module

## Setup
- Run `npm install`
- Follow instructions in [fvtt.config.example.js](./fvtt.config.example.js)
- Run `npm run build` or `npm run watch`
- Run Foundry
- Install additionally required module [FVTT Quench](https://github.com/Ethaks/FVTT-Quench)
- Create a new world for [CoC7](https://github.com/Miskatonic-Investigative-Society/CoC7-FoundryVTT)
- Mark both Quench and this module as used
- Check if `baseUrl` in `cypress.config.js` matches your URL (TODO: make this easier)

## Running tests
- Run component tests through UI by clicking the `Quench` button
- Run `Cypress` tests by calling `npx cypress open` and opening the E2E browser tests in Chrome

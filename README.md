# React-admin Demo

This is a demo of the [react-admin](https://github.com/marmelab/react-admin) library for React.js. It creates a working administration for a fake poster shop named Posters Galore. You can test it online at http://marmelab.com/react-admin-demo.

[![react-admin-demo](https://marmelab.com/react-admin/img/react-admin-demo-still.png)](https://vimeo.com/268958716)

React-admin usually requires a REST/GraphQL server to provide data. In this demo however, the API is simulated by the browser (using [FakeRest](https://github.com/marmelab/FakeRest)). The source data is generated at runtime by a package called [data-generator](https://github.com/marmelab/react-admin/tree/master/examples/data-generator).

To explore the source code, start with [src/App.js](https://github.com/marmelab/react-admin/blob/master/examples/demo/src/App.js).

**Note**: This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to run

1. Setup your credentials to marmelab registry in `.npmrc`

2. Install dependencies

```sh
make install
```

3. Run

```sh
make start
```

## Available Scripts

In the project directory, you can run:

### `make start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `make deploy`

Build and deploy the app to gh-pages.

### `make build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
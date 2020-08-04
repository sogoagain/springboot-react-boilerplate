import React from 'react';

import {
  Route, Switch,
} from 'react-router-dom';

import MainLayout from './components/MainLayout';
import NotFound from './components/NotFound';
import HelloWorldPage from './pages/HelloWorldPage';

function renderWithLayout(component) {
  return (
    <MainLayout>
      {component}
    </MainLayout>
  );
}

const App = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => renderWithLayout(<HelloWorldPage />)}
    />
    <Route
      path="/404"
      render={() => renderWithLayout(<NotFound />)}
    />
    <Route render={() => renderWithLayout(<NotFound />)} />
  </Switch>
);

export default App;

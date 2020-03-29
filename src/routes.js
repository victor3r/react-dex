import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Detail from './pages/Detail';
import Pokemons from './pages/Pokemons';
import Team from './pages/Team';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Pokemons} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/team" component={Team} />
      </Switch>
    </BrowserRouter>
  );
}
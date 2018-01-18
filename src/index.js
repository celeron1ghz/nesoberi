import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route, Link } from 'react-router-dom'; 

import { Button } from 'react-bootstrap';

import ErrorRoute      from './route/Error'
import NesoListRoute   from './route/NesoList'
import SeriesListRoute from './route/SeriesList'

render(
  <HashRouter>
    <div>
      <h4 style={{ margin: "10px 15px -10px 15px" }}>
        <Button bsStyle="primary" bsSize="xs" href="#/">寝そべり一覧</Button>
        &nbsp;
        <Button bsStyle="primary" bsSize="xs" href="#/series">シリーズ一覧</Button>
      </h4>
      <br/>
      <Switch>
        <Route exact path="/"       component={NesoListRoute}/> 
        <Route exact path="/series" component={SeriesListRoute}/> 
        <Route component={ErrorRoute}/> 
      </Switch>
    </div>
  </HashRouter>
,document.getElementById('root'));
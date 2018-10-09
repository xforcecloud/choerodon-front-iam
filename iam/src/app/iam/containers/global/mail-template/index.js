import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { asyncRouter, nomatch } from 'choerodon-front-boot';

const index = asyncRouter(() => (import('./MailTemplate')), () => import('../../../stores/global/mail-template'));

const Index = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={index} />
    <Route path="*" component={nomatch} />
  </Switch>
);

export default Index;
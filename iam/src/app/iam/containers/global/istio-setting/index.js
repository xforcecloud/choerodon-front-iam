import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { asyncRouter, nomatch } from 'choerodon-front-boot';
import Template from './naftis/views/Service/TaskTemplate/index.js'
import CreateTask from './naftis/views/Service/CreateTask/index.js'
import { Provider } from 'react-redux'


const index = asyncRouter(() => import('./IstioSetting')
, () =>  import('../../../stores/global/istio-setting'));


// const about =  asyncRouter(() => import('./IstioTemplate')
// , () =>  import('../../../stores/global/istio-setting'));


function about() {
  return <h2>Home</h2>;
}

console.log("aaaaaa" + Template)

const Index = ({ match }) => {
  
    
  return (
  <Switch>
      <Route exact path={match.url} component={index} />
      <Route path= {`${match.url}/about`} component={about} />
      <Route path= {`${match.url}/template`} component={Template} />
      <Route path= {`${match.url}/createTask`} component={CreateTask} />
      <Route path={'*'} component={nomatch} />
  </Switch>
)};

export default Index;

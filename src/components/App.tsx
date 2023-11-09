import Layout from './Layout'
import Home from '../pages/Home'
import { Component } from 'solid-js';
import { Container } from 'inversify';
import { ApiProvider } from '../hooks/useApi';
import { Route, Router, Routes, hashIntegration } from '@solidjs/router'
import SettingsPage from '../pages/SettingsPage';
import IntegrationListPage from '../pages/IntegrationListPage';
import NewIntegrationPage from '../pages/NewIntegrationPage';
import EditIntegrationPage from '../pages/EditIntegrationPage';


const App: Component<{ api: Container }> = (props) => {
  return <ApiProvider value={props.api}>
    <Router source={hashIntegration()}>
      <Layout>
        <Routes>
          <Route path="/settings/:section?" component={SettingsPage} />
          <Route path="/integrations/list" component={IntegrationListPage} />
          <Route path="/integrations/new/:id" component={NewIntegrationPage} />
          <Route path="/integrations/edit/:id" component={EditIntegrationPage} />
          <Route path="/" component={Home} />
        </Routes>
      </Layout>
    </Router>
  </ApiProvider>
}

export default App;

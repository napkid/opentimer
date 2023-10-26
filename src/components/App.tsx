import Layout from './Layout'
import Home from './Home'
import { QueryClientProvider } from '@tanstack/solid-query';
import { QueryClient } from '@tanstack/query-core';
import { Component } from 'solid-js';
import { Container } from 'inversify';
import { ApiProvider } from '../hooks/useApi';
import { Route, Router, Routes, hashIntegration } from '@solidjs/router'
import SettingsPage from '../pages/SettingsPage';


const App: Component<{ api: Container }> = (props) => {
  return <ApiProvider value={props.api}>
    <Router source={hashIntegration()}>
      <Layout>
        <Routes>
          <Route path="/settings/:section?" component={SettingsPage} />
          <Route path="/" component={Home} />
        </Routes>
      </Layout>
    </Router>
  </ApiProvider>
}

export default App;

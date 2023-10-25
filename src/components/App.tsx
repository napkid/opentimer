import Layout from './Layout'
import Home from './Home'
import { QueryClientProvider } from '@tanstack/solid-query';
import { QueryClient } from '@tanstack/query-core';
import { Component } from 'solid-js';
import { Container } from 'inversify';
import { ApiProvider } from '../hooks/useApi';



const App: Component<{ api: Container }> = (props) => {
  return <ApiProvider value={props.api}>
    <Layout>
      <Home />
    </Layout>
  </ApiProvider>
}

export default App;

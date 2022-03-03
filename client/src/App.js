import './App.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import Paths from './Routes'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Paths />
    </BrowserRouter>
  </ApolloProvider>
)

export default App

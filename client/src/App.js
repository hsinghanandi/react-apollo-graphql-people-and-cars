import './App.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Title from './components/layout/Title'
import AddPerson from './components/forms/AddPerson'
import AddCar from './components/forms/AddCar'
import People from './components/lists/People'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Title />
      <AddPerson />
      <AddCar />
      <People />
    </div>
  </ApolloProvider>
)

export default App

import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  InMemoryCache,
} from '@apollo/client'
import { gql } from '@apollo/client'

const EXCHANGE_RATES = (currency: string): DocumentNode => gql`
  query GetExchangeRates {
    rates(currency: "${currency}") {
      currency
      rate
    }
  }
`

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
})

export function getExchangeRate(): Promise<ApolloQueryResult<any>> {
  return client.query({
    query: EXCHANGE_RATES('USD'),
  })
}

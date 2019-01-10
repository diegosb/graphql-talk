import React from 'react'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { ApolloProvider, Query } from 'react-apollo'
import { DisplayText, Table, TextContainer } from '@argo-digital/argo-ui'
import styled from 'styled-components'
import { List as LoadingList } from '../../components/Loadings'

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
`

const client = new ApolloClient({
  uri: 'http://azus-br-moderation-api.azurewebsites.net/graphiql'
})

const GET_MODERATIONS = gql`
  {
    moderations(first: 10) {
      id
      quotationIdentifier
      status
      moderationType
      insurerName
    }
  }
`

const Error = () => (
  <Wrapper>
    <TextContainer align='center' spacing='tight'>
      <DisplayText color='#263DC2'>Houve um erro na requisição.</DisplayText>
      <p>Aguarde alguns minutos e tente novamente.</p>
    </TextContainer>
  </Wrapper>
)

const ModerationsGraphQL = () => (
  <ApolloProvider client={client}>
    <Query query={GET_MODERATIONS}>
      {({ loading, error, data }) => {
        if (error) return <Error />
        if (loading) return <LoadingList />
        return (
          <Wrapper>
            <Table>
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Nome do segurado</th>
                  <th>Cotação</th>
                  <th>Status</th>
                  <th>Tipo</th>
                  <th />
                </tr>
                {data.moderations.map(moderation => (
                  <tr key={moderation.id}>
                    <td>{moderation.id}</td>
                    <td>{moderation.insurerName}</td>
                    <td>{moderation.quotationIdentifier}</td>
                    <td>{moderation.status}</td>
                    <td>{moderation.type}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Wrapper>
        )
      }}
    </Query>
  </ApolloProvider>
)

export default ModerationsGraphQL

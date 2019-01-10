import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET__ALL_HEROES = gql`
    query {
        heroes {
            name
            height
            mass
        }
    }
}`

const Feed = () => (
  <Query query={GET_ALL_HEROES}>
    {({ loading, error, data }) => {
      if (error) return <Error />
      if (loading || !data) return <LoaderSpinner />
      return <HeroesList dogs={data.heroes} />
    }}
  </Query>
)

export default Feed

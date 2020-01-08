const {gql} = require('apollo-server');
const typeDefs = gql`
  enum PatchSize {
    SMALL
    LARGE
  }
  
  type User {
    id: ID!
    email: String!
    trips: [Launch]!  
  }
  
  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }
  
  type Rocket {
    id: ID!
    name: String
    type: String
  }
  
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }
  
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }
    
  type Query {
    launches(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }
  
  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): String
  }
  
  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }
  
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }
`;

module.exports = typeDefs;
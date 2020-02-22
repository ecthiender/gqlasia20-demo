const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    projects: [Project!]!
  }

  type Project {
    id: Int!
    title: String!
    user_id: Int!
    tasks: [Task]!
  }

  type Task {
    id: Int!
    title: String!
    project_id: Int!
    project: Project!
  }

  type Query {
    getUser: User
    getTask(id: Int!): Task
  }
`;

module.exports = typeDefs;

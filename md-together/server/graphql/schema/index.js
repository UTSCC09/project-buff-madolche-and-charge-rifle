const {buildSchema} = require("graphql");

module.exports = buildSchema(`
type user {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    otherId: String
    project: [liteProject!]
}
type Authdata{
    userId: ID!
    token: String!
    tokenExpiration: Int! 
}
input userInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String
    otherId: String
}
type project{
    _id: ID!
    name: String!
    owner: ID!
    editor: [ID!]
    content: String!
}
type liteProject{
    _id: ID!
    name: String!
}
input projectInput{
    name:String!
    content: String!
}
type RootQuery {
    users: [user!]!
    project(userId:ID!): [liteProject!]
    emailLogin(email: String!, password: String!): Authdata!
}
type RootMutation {
    createUser(UserInput: userInput!): user!
    createProject(ProjectInput: projectInput!): project!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
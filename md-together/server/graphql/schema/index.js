const {buildSchema} = require("graphql");

module.exports = buildSchema(`
type user {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    otherId: String
    status: String
    owned: [liteProject!]
    shared: [liteProject!]
    invited: [liteProject!]
}
type Authdata{
    userId: ID!
    email: String!
    token: String!
    firstName: String!
    lastName: String!
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
    name: String!
    owner: ID
}
type RootQuery {
    owned(userId: ID!): [liteProject!]
    shared(userId: ID!): [liteProject!]
    invited(userId: ID!): [liteProject!]
    emailLogin(email: String!, password: String!): Authdata!
    getContent(projectId:ID!, userId:ID!, type: String!): String!
    logout(userId: ID!): String!
}
type RootMutation {
    createUser(UserInput: userInput!): Authdata!
    createProject(ProjectInput: projectInput!): project!
    createInv(owner: ID!, email: String!, projectId: ID!): [liteProject!]
    acceptInv(userId: ID!, projectId: ID!): [liteProject!]
    rejectInv(userId: ID!, projectId: ID!): [liteProject!]
    saveContent(userId: ID!, projectId: ID!, content: String!, type: String!): String!
    deleteProject(userId: ID!, projectId:ID!): [liteProject!]
    ownerDelPro(userId: ID!, projectId:ID!): [liteProject!]
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
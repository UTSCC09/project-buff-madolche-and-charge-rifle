const Express = require("express");
const BodyParser = require("body-parser");
const {graphqlHTTP} = require("express-graphql");
// const { buildSchema, isNonNullType } = require("graphql");
const mongoose = require("mongoose");
const mySchema = require("./graphql/schema/index");
const myResolver = require("./graphql/resolver/index");
const auth = require("./middleware/auth");
const { PeerServer } = require('peer');
let app = Express();

const cors = require('cors');
app.use(cors({
  origin: ['https://mdtogether.live', 'https://www.mdtogether.live', 'https://api.mdtogether.live']
}));

//the whole backend codes are learned from https://www.youtube.com/playlist?list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_
// great appreciation to academind
app.use(BodyParser.json());
app.use((req,res,next) =>{
    //console.log(req);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods',"POST,GET,OPTIONS");
    res.setHeader('Access-Control-Allow-Headers',"Content-Type, Authorization");
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});
app.use(auth);
//cannot change the name "schema" but can change name "RootQuery" "RootMutation"
//[user!]! means it must return an array(maybe empty array) and the element inside array must be user if we have element
app.use("/graphql", graphqlHTTP({
    schema: mySchema,
    //rootValue is resolver for schema
    rootValue: myResolver,
    graphiql: true
}));
mongoose.connect("mongodb+srv://mdTogether:mdTogether@cluster0.sjsbm.mongodb.net/mdTogether?retryWrites=true&w=majority")
.then(() => {
    app.listen(3001,() =>{
        console.log("server running at 3001");
    })
    // running the peer server for peer js connections
    PeerServer({port:9000, path:'/mdtogether'});
})
.catch(err => console.error(err));


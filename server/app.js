const Express = require("express");
const BodyParser = require("body-parser");
const {graphqlHTTP} = require("express-graphql");
// const { buildSchema, isNonNullType } = require("graphql");
const mongoose = require("mongoose");
const mySchema = require("./graphql/schema/index");
const myResolver = require("./graphql/resolver/index");
const auth = require("./middleware/auth");
const { ExpressPeerServer } = require('peer');
let app = Express();

const cors = require('cors');
app.use(cors({
  // origin: ['https://mdtogether.live', 'https://www.mdtogether.live', 'https://api.mdtogether.live']
  origin: 'https://mdtogether.live'
}));
// app.use(cors());

//the whole backend codes are learned from https://www.youtube.com/playlist?list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_
// great appreciation to academind
app.use(BodyParser.json());
// app.use((req,res,next) =>{
//     //console.log(req);
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods',"POST,GET,OPTIONS");
//     res.setHeader('Access-Control-Allow-Headers',"Content-Type, Authorization");
//     if(req.method === 'OPTIONS'){
//         return res.sendStatus(200);
//     }
//     next();
// });
app.use(auth);
app.use("/graphql", graphqlHTTP({
    schema: mySchema,
    rootValue: myResolver,
    graphiql: true
}));

const http = require('http');
const PORT = 3000;
const server = http.createServer(app);

const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use('/peer', peerServer);

server.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
})

mongoose.connect("mongodb+srv://mdTogether:mdTogether@cluster0.sjsbm.mongodb.net/mdTogether?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to mongodb on port %s", PORT);
})
.catch(err => console.error(err));

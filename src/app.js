import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import schema from "./schema";
import cors from "cors";
const app = express();

const port = process.env.PORT || 3000;
app.use(cors());
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);
app.listen(port, () => console.log(`Server on ${port}`));

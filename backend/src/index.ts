import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { expressMiddleware } from "@apollo/server/express4";
import { GraphQLSchema } from "graphql";
import { dataSource } from "./datasource";
import { CharacterResolver } from "./resolvers/CharacterResolver";
import { EventResolver } from "./resolvers/EventResolver";
import { ScenarioResolver } from "./resolvers/ScenarioResolver";

const port = 5000;
const app = express();
let schema: GraphQLSchema;
let apolloServer: ApolloServer<MyContext>;
interface MyContext {
  token?: string;
}

const startApollo = async () => {
  schema = await buildSchema({
    resolvers: [CharacterResolver, EventResolver, ScenarioResolver],
  });
  apolloServer = new ApolloServer<MyContext>({ schema });
  await apolloServer.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer)
  );
};
startApollo();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`project's backend listening on http://localhost:${port}`);
});

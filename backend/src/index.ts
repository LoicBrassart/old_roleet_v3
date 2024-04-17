import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { expressMiddleware } from "@apollo/server/express4";
import { dataSource } from "./datasource";
import { EventResolver } from "./resolvers/EventResolver";
import { ScenarioResolver } from "./resolvers/ScenarioResolver";
import { MapResolver } from "./resolvers/MapResolver";
import { PointOfInterestResolver } from "./resolvers/PointOfInterestResolver";

const port = 5000;
const app = express();

const startApollo = async () => {
  interface MyContext {
    token?: string;
  }
  const schema = await buildSchema({
    resolvers: [
      EventResolver,
      ScenarioResolver,
      MapResolver,
      PointOfInterestResolver,
    ],
  });
  const apolloServer = new ApolloServer<MyContext>({ schema });
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
  console.log(`Project's backend live and kicking !`);
});

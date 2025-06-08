import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema, root } from "./graphql.js";
import { router } from "./routes.js";
import dotenv from "dotenv";

dotenv.config();

export const app = express();
app.use(express.json());
app.use(router);
app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));

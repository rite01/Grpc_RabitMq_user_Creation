import { buildSchema } from "graphql";
import { userServiceClient } from "./grpc-client.js";
import { userSchema } from "./validation.js";

export const schema = buildSchema(`
  type User { id: String, name: String, email: String }
  type Query { getUser(id: String!): User }
  type Mutation { createUser(name: String!, email: String!): User }
`);

export const root = {
  getUser: ({ id }: { id: string }) =>
    new Promise((resolve, reject) => {
      userServiceClient.GetUser({ id }, (err: any, response: any) => {
        if (err) reject(err);
        else resolve(response);
      });
    }),
  createUser: ({ name, email }: { name: string; email: string }) =>
    new Promise((resolve, reject) => {
      const { error } = userSchema.validate({ name, email });
      if (error) reject(new Error(error.details[0].message));
      userServiceClient.CreateUser(
        { name, email },
        (err: any, response: any) => {
          if (err) reject(err);
          else resolve(response);
        }
      );
    }),
};

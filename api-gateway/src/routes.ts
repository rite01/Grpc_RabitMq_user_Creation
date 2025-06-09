/**
 * Express router for user-related REST endpoints.
 *
 * - Validates incoming user data
 * - Forwards user creation requests to the user-service via gRPC
 * - Handles error responses and validation feedback
 */

import express, { Request, Response } from "express";
import { userServiceClient } from "./grpc-client.js";
import { userSchema } from "./validation.js";

export const router = express.Router();

router.post("/users", (req: Request, res: Response): void => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  userServiceClient.CreateUser(req.body, (err: any, response: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(response);
  });
});

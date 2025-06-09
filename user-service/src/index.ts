/**
 * Entry point for the User Service.
 *
 * - Loads environment variables
 * - Connects to MongoDB and RabbitMQ
 * - Starts the gRPC server on the specified port
 */

import dotenv from "dotenv";
dotenv.config();

import { connectRabbitMQ } from "./rabbitmq.js";
import { createGrpcServer } from "./grpc-server.js";
import connectDB from "./db.js";
import grpc from "@grpc/grpc-js";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const QUEUE_NAME = "user_created";
const PORT = 50051;

await connectDB();
await connectRabbitMQ(RABBITMQ_URL, QUEUE_NAME);

const server = createGrpcServer();

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`[UserService] User Service running on port ${PORT}`);
  }
);

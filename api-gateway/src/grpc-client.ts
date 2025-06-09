/**
 * gRPC client setup for communicating with the user-service.
 *
 * - Loads the user.proto definition
 * - Creates a gRPC client for the UserService
 * - Uses USER_SERVICE_ADDR environment variable for service address
 */

import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.resolve(__dirname, "../../proto/user.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const userProto: any = grpc.loadPackageDefinition(packageDefinition).user;

const USER_SERVICE_ADDR = process.env.USER_SERVICE_ADDR || "localhost:50051";
export const userServiceClient = new userProto.UserService(
  USER_SERVICE_ADDR,
  grpc.credentials.createInsecure()
);

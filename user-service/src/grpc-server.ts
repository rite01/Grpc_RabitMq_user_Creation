import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import UserModel, { IUser } from "./user.model.js";
import { sendToQueue } from "./rabbitmq.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.resolve(__dirname, "../../proto/user.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const userProto: any = grpc.loadPackageDefinition(packageDefinition).user;

export function createGrpcServer(): grpc.Server {
  const server = new grpc.Server();
  server.addService(userProto.UserService.service, {
    CreateUser: async (call: any, callback: any) => {
      try {
        const user: any = new UserModel({ ...call.request });
        await user.save();
        sendToQueue("user_created", user);
        callback(null, {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        });
        console.log("[gRPC] Created user:", user.email);
      } catch (err) {
        console.error("[gRPC] CreateUser error:", err);
        callback({
          code: grpc.status.INTERNAL,
          message: "Failed to create user",
        });
      }
    },
    GetUser: async (call: any, callback: any) => {
      try {
        const user: any = await UserModel.findById(call.request.id);
        if (!user) {
          console.log("[gRPC] GetUser: not found", call.request.id);
          return callback({
            code: grpc.status.NOT_FOUND,
            message: "User not found",
          });
        }
        callback(null, {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        });
      } catch (err) {
        console.error("[gRPC] GetUser error:", err);
        callback({ code: grpc.status.INTERNAL, message: "Failed to get user" });
      }
    },
    UpdateUser: async (call: any, callback: any) => {
      try {
        const user: any = await UserModel.findByIdAndUpdate(
          call.request.id,
          { name: call.request.name, email: call.request.email },
          { new: true }
        );
        if (!user) {
          console.log("[gRPC] UpdateUser: not found", call.request.id);
          return callback({
            code: grpc.status.NOT_FOUND,
            message: "User not found",
          });
        }
        callback(null, {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        });
        console.log("[gRPC] Updated user:", user.email);
      } catch (err) {
        console.error("[gRPC] UpdateUser error:", err);
        callback({
          code: grpc.status.INTERNAL,
          message: "Failed to update user",
        });
      }
    },
    DeleteUser: async (call: any, callback: any) => {
      try {
        const result = await UserModel.findByIdAndDelete(call.request.id);
        if (!result) {
          console.log("[gRPC] DeleteUser: not found", call.request.id);
          return callback({
            code: grpc.status.NOT_FOUND,
            message: "User not found",
          });
        }
        callback(null, { success: true });
        console.log("[gRPC] Deleted user:", call.request.id);
      } catch (err) {
        console.error("[gRPC] DeleteUser error:", err);
        callback({
          code: grpc.status.INTERNAL,
          message: "Failed to delete user",
        });
      }
    },
  });
  return server;
}

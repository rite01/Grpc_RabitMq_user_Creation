import amqp from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

async function start() {
  const conn = await amqp.connect(RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue("user_created");
  console.log("Notification Service waiting for user_created messages...");
  channel.consume("user_created", (msg) => {
    if (msg !== null) {
      const user = JSON.parse(msg.content.toString());
      console.log("Notification: New user created:", user);
      channel.ack(msg);
    }
  });
}

start();

import amqp, { Channel } from "amqplib";

let channel: Channel | null = null;

export async function connectRabbitMQ(
  rabbitUrl: string,
  queue: string
): Promise<Channel> {
  if (channel) return channel;
  try {
    const conn = await amqp.connect(rabbitUrl);
    channel = await conn.createChannel();
    await channel.assertQueue(queue);
    console.log(`[RabbitMQ] Connected and queue '${queue}' asserted.`);
    return channel;
  } catch (err) {
    console.error("[RabbitMQ] Connection failed:", err);
    process.exit(1);
  }
}

export function sendToQueue(queue: string, msg: unknown) {
  if (!channel) throw new Error("RabbitMQ channel is not initialized");
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
  console.log(`[RabbitMQ] Sent message to '${queue}':`, msg);
}
export function closeRabbitMQ() {
  if (channel) {
    channel.close();
    console.log("[RabbitMQ] Channel closed.");
  } else {
    console.warn("[RabbitMQ] No channel to close.");
  }
}

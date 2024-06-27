import amqplib from 'amqplib';

export const connectQueue= async () => {
    try {
        // Connect to the RabbitMQ server
        let connection = await amqplib.connect(process.env.RABBITMQ_URL);
        // Create a channel
        const channel = await connection.createChannel();
        // Create a queue
        await channel.assertQueue(process.env.QUEUE_NAME);
        console.log('Connected to the queue');
        return channel;
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
    };
    
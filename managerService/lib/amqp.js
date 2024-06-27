import amqplib from "amqplib";


async function connectQueue(){
    try {
        let connection = await amqplib.connect(process.env.RABBITMQ_URL);

        let channel = await connection.createChannel();
        await channel.assertQueue(process.env.RABBITMQ_URL,{ noAck:false });
        console.log('Queue connected!')

        return channel;
    } catch (error) {
        console.error('Queue error',error.message)
    }
}

export default connectQueue;
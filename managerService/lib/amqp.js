import amqplib from "amqplib";

async function connectQueue(){
    try {
        let connection = await amqplib.connect('amqp://localhost');
        let channel = await connection.createChannel();
        await channel.assertQueue(process.env.QUEUE_NAME,{ noAck:false });
        console.log('Queue connected!')

        return channel;
    } catch (error) {
        console.error('Queue error',error.message)
    }
}

export default connectQueue;
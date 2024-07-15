import fs from 'fs';
import MessageModel from '../daos/mongodb/models/message.model.js';

export async function saveMessageToMongoDB(user, message) {
    try {
        await MessageModel.create({ user, message });
        console.log('Message saved to MongoDB');
    } catch (error) {
        console.error('Error saving message to MongoDB:', error);
    }
}

export function saveMessageToFileSystem(user, message) {
    try {
        const fileName = 'messages.txt';
        const content = `${user}: ${message}\n`;
        fs.appendFileSync(fileName, content);
        console.log('Message saved to file system');
    } catch (error) {
        console.error('Error saving message to file system:', error);
    }
}

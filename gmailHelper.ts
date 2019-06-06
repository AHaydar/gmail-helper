import * as fs from 'fs';
import * as path from 'path';

import { google } from 'googleapis';

const credentialsPath = path.join(__dirname, 'credentials.json');
const tokenPath = path.join(__dirname, 'token.json');

if (!fs.existsSync(credentialsPath) || !fs.existsSync(tokenPath)) {
    throw new Error('Could not find credentials.json or token.json in: ' + __dirname + '. Please follow the steps at https://developers.google.com/gmail/api/quickstart/nodejs to generate them!');
}

const credentials = fs.readFileSync(path.resolve(__dirname, credentialsPath), 'utf8');
const { client_secret, client_id, redirect_uris } = JSON.parse(credentials).installed;
const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
const token = fs.readFileSync(path.resolve(__dirname, tokenPath), 'utf8');
oauth2Client.setCredentials(JSON.parse(token));

// set the authentication client at the service-level
const gmail = google.gmail({
    version: 'v1',
    auth: oauth2Client,
    timeout: 10000
})

/**
 * List the labels in the given gmail account
 */
export const listLabels = async () => {
    try {
        const res = await gmail.users.labels.list({
            userId: 'me',
        });
        return res;
    }
    catch (e) {
        throw new Error('Unable to retrieve the list of email messages: ' + e);
    }
};


/**
 * Get the content of a specific message
 */
export const getMessageContent = async (id: string) => {
    try {
        const messageContent = await gmail.users.messages.get({
            id,
            userId: 'me',
            format: 'full'
        });
        return messageContent;
    } catch (e) {
        throw new Error('Unable to retrieve message content: ' + e);
    }
};

/**
 * Delete emails matching a given query. Supports the same query format as the Gmail search box. For example, "from:someuser@example.com is:unread" 
 */
export const batchDeleteMessagesByIds = (ids: string[]) => {
    try {
        gmail.users.messages.batchDelete({
            userId: 'me',
            requestBody: {
                ids
            }
        });
    } catch (e) {
        throw new Error('Unable to delete messages: ' + e)
    }
};

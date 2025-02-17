import { Client, Account, ID } from "appwrite";

const client = new Client();

client.setEndpoint(import.meta.env.APPWRITE_ENDPOINT);
client.setProject(import.meta.env.APPWRITE_PROJECT_ID);

const account = new Account(client);

export { account };

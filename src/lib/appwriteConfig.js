import { Client, Account, ID } from "appwrite";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1");
client.setProject("67a2e486002e2c8312b3");

const account = new Account(client);

export { account };

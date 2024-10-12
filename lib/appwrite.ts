import { Client, Account, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.tot.tot",
  projectId: "670a5aa600294c75edfb",
  databaseId: "670a5c5000093c31225b",
  userCollectionId: "670a5c77000e4b6e2373",
  recordCollectionId: "670a5cb10011afef4146",
  storageId: "670a5dd7003d6fffe59e",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform); // YOUR application ID

const account = new Account(client);

export const createUser = () => {
  // Register User
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};

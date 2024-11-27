const sdk = require("node-appwrite");

const client = new sdk.Client();
const users = new sdk.Users(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite API Endpoint
  .setProject("<YOUR_PROJECT_ID>") // Project ID
  .setKey("<YOUR_API_KEY>"); // API Key (Admin 권한)

const deleteUser = async (userId) => {
  try {
    await users.delete(userId);
    console.log(`User with ID ${userId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting user:", error.message);
  }
};

module.exports = { deleteUser };
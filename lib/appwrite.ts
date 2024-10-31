import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Storage,
  Query,
} from "react-native-appwrite";

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
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return (await currentUser).documents[0];
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Save record
export async function saveRecords(category: string, id: string, time: number) {
  try {
    const newRecord = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.recordCollectionId,
      ID.unique(),
      {
        category: category,
        recordTime: time,
        users: id,
      }
    );

    return newRecord;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const saveGoalTime = async ( documentId: string, time : number) => {
  try{
    const res = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      documentId,
      {
        goalTime: time
      }
    );

    return res
  }catch(error: any){
    console.log(error)
  }
}

export const updateYourname = async ( documentId: string, name : string) => {
  try{
    const res = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      documentId,
      {
        username: name
      }
    );

    return res
  }catch(error: any){
    console.log(error)
  }
}

// Get records
export const getUserRecords = async (id: string, year: number,
  month: number) => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const startDate = new Date(year, month - 1, 1).toISOString(); // 월은 0부터 시작하므로 -1
    const endDate = new Date(year, month, 0, 23, 59, 59, 999).toISOString(); // 다음 달의 0일은 현재 월의 마지막 날

    const currentRecords = databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.recordCollectionId,
      [
        Query.equal("users", id),
        Query.greaterThanEqual("$createdAt", startDate),
        Query.lessThanEqual("$createdAt", endDate)
      ]
    );

    if (!currentRecords) throw Error;

    // category별로 recordTime을 합산
    const recordsByCategoryMap = (await currentRecords).documents.reduce(
      (acc, record) => {
        const category = record.category || "Uncategorized"; // category가 없으면 "Uncategorized"로 처리
        const recordTime = record.recordTime || 0; // recordTime이 없으면 0으로 처리

        if (!acc[category]) {
          acc[category] = 0;
        }

        acc[category] += recordTime;
        return acc;
      },
      {} as Record<string, number>
    );

    // 결과를 배열 형태로 변환
    const recordsByCategoryArray = Object.entries(recordsByCategoryMap).map(
      ([category, recordTime]) => ({
        category,
        recordTime,
      })
    );

    return recordsByCategoryArray;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Get monthly total records
export const getMonthlyRecords = async (
  id: string,
  year: number,
  month: number
) => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Account not found");

    // 해당 월의 시작일과 종료일을 설정
    const startDate = new Date(year, month - 1, 1).toISOString(); // 월은 0부터 시작하므로 -1
    const endDate = new Date(year, month, 0, 23, 59, 59, 999).toISOString(); // 다음 달의 0일은 현재 월의 마지막 날

    // 해당 사용자와 특정 월에 해당하는 문서를 필터링
    const currentRecords = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.recordCollectionId,
      [
        Query.equal("users", id),
        Query.greaterThanEqual("$createdAt", startDate),
        Query.lessThanEqual("$createdAt", endDate)
      ]
    );

    if (!currentRecords) throw new Error("No records found");

    // recordTime 필드를 합산
    const totalRecordTime = currentRecords.documents.reduce((sum, record) => {
      return sum + (Number(record.recordTime) || 0); // recordTime이 없을 경우 0으로 처리
    }, 0);

    return totalRecordTime;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Failed to get monthly record time sum");
  }
};

// Get today total records
export const getTodayRecords = async (
  id: string,
  year: number,
  month: number,
  day: number
) => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Account not found");

    const startDate = new Date(year, month - 1, day, 0, 0, 0).toISOString(); // 월은 0부터 시작하므로 -1
    const endDate = new Date(
      year,
      month - 1,
      day,
      23,
      59,
      59,
      999
    ).toISOString();

    // 해당 사용자와 특정 월에 해당하는 문서를 필터링
    const currentRecords = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.recordCollectionId,
      [
        Query.equal("users", id),
        Query.greaterThanEqual("$createdAt", startDate),
        Query.lessThan("$createdAt", endDate),
      ]
    );

    if (!currentRecords) throw new Error("No records found");

    const recordsByCategoryMap = (await currentRecords).documents.reduce(
      (acc, record) => {
        const category = record.category || "Uncategorized"; // category가 없으면 "Uncategorized"로 처리
        const recordTime = record.recordTime || 0; // recordTime이 없으면 0으로 처리

        if (!acc[category]) {
          acc[category] = 0;
        }

        acc[category] += recordTime;
        return acc;
      },
      {} as Record<string, number>
    );

    // 결과를 배열 형태로 변환
    const recordsByCategoryArray = Object.entries(recordsByCategoryMap).map(
      ([category, recordTime]) => ({
        category,
        recordTime,
      })
    );

    return recordsByCategoryArray;
    // return currentRecords.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Failed to get monthly record time sum");
  }
};

// Get today total records
export const getTodayTotalRecords = async (
  id: string,
  year: number,
  month: number,
  day: number
) => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Account not found");

    const startDate = new Date(year, month - 1, day, 0, 0, 0).toISOString(); // 월은 0부터 시작하므로 -1
    const endDate = new Date(
      year,
      month - 1,
      day,
      23,
      59,
      59,
      999
    ).toISOString();

    // 해당 사용자와 특정 월에 해당하는 문서를 필터링
    const currentRecords = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.recordCollectionId,
      [
        Query.equal("users", id),
        Query.greaterThanEqual("$createdAt", startDate),
        Query.lessThanEqual("$createdAt", endDate),
      ]
    );

    if (!currentRecords) throw new Error("No records found");

    // recordTime 필드를 합산
    const totalRecordTime = currentRecords.documents.reduce((sum, record) => {
      return sum + (Number(record.recordTime) || 0); // recordTime이 없을 경우 0으로 처리
    }, 0);

    return totalRecordTime;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Failed to get monthly record time sum");
  }
};

export const getWeeklyRecords = async (
  id: string,
  selectedDate : any,
  daysToFetch: number,
) => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Account not found");

    const dates = Array.from({ length: daysToFetch }, (_, i) => {
      const date = new Date(selectedDate)
      date.setDate(date.getDate() - (daysToFetch - 1 - i)); // 과거부터 오늘까지
      return date;
    });

    const weeklyRecords = await Promise.all(
      dates.map((date) => {
        const day = date.getDate(); // 일(day) 값
        const dayforString = date.getDay(); // 요일(day) 값
        const startDate = new Date(date.getFullYear(), date.getMonth(), day, 0, 0, 0).toISOString();
        const endDate = new Date(date.getFullYear(), date.getMonth(), day, 23, 59, 59, 999).toISOString();

        return databases
          .listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.recordCollectionId,
            [
              Query.equal("users", id),
              Query.greaterThanEqual("$createdAt", startDate),
              Query.lessThan("$createdAt", endDate),
            ]
          )
          .then((records) => {
            const totalRecordTime = records.documents.reduce((sum, record) => {
              return sum + (Number(record.recordTime) || 0);
            }, 0);

            return { day, dayforString, totalRecordTime };
          });
      })
    );

    return weeklyRecords; 
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Failed to get weekly record time sum");
  }
};

import { appwrite } from "@/constants";
import type { AccountAuthType } from "@/types/appwriteTypes";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  private readonly client = new Client();
  private readonly account;

  constructor() {
    this.client.setEndpoint(appwrite.endpoint).setProject(appwrite.projectId);
    this.account = new Account(this.client);
  }

  // Create user
  async createAccount({ email, password }: AccountAuthType) {
    try {
      const createdUser = await this.account.create(
        ID.unique(),
        email,
        password
      );

      if (createdUser) {
        // Login user after creation
        return await this.loginUser({ email, password });
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to create a new account:", error);
    }
  }

  // Login user
  async loginUser({ email, password }: AccountAuthType) {
    try {
      const currentSession = await this.account.createEmailPasswordSession(
        email,
        password
      );

      if (currentSession) {
        return currentSession;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to log in user:", error);
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const currentUser = await this.account.get();

      if (currentUser) {
        return currentUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to get current user:", error);
    }
  }

  // Logout user
  async logoutUser() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Failed to logout user:", error);
    }
  }
}

export default new AuthService();

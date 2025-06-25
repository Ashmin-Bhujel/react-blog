import { appwrite } from "@/constants";
import { Client, ID, Storage } from "appwrite";

export class StorageService {
  private readonly client = new Client();
  private readonly storage;

  constructor() {
    this.client.setEndpoint(appwrite.endpoint).setProject(appwrite.projectId);
    this.storage = new Storage(this.client);
  }

  // Upload file
  async uploadFile(file: File) {
    try {
      const response = await this.storage.createFile(
        appwrite.imagesBucketId,
        ID.unique(),
        file
      );

      if (response) {
        return response;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to upload the file:", error);
    }
  }

  // Delete file
  async deleteFile(fileId: string) {
    try {
      await this.storage.deleteFile(appwrite.imagesBucketId, fileId);
    } catch (error) {
      console.error("Failed to delete the file:", error);
    }
  }

  // Get file preview
  getFilePreview(fileId: string) {
    try {
      const response = this.storage.getFilePreview(
        appwrite.imagesBucketId,
        fileId
      );

      if (response) {
        return response;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to get the file preview:", error);
    }
  }
}

export default new StorageService();

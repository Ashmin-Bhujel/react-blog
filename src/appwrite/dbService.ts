import { appwrite } from "@/constants";
import type { ArticlesCollectionType } from "@/types/appwriteTypes";
import { Client, Databases, Query } from "appwrite";

export class DbService {
  private readonly client = new Client();
  private readonly databases;

  constructor() {
    this.client.setEndpoint(appwrite.endpoint).setProject(appwrite.projectId);
    this.databases = new Databases(this.client);
  }

  // Create article
  async createArticle(articleId: string, data: ArticlesCollectionType) {
    try {
      const response = await this.databases.createDocument(
        appwrite.blogsDatabaseId,
        appwrite.articlesCollectionId,
        articleId,
        data
      );

      if (response) {
        return response;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to create an article:", error);
    }
  }

  // Update article
  async updateArticle(
    articleId: string,
    data: Partial<ArticlesCollectionType>
  ) {
    try {
      const response = await this.databases.updateDocument(
        appwrite.blogsDatabaseId,
        appwrite.articlesCollectionId,
        articleId,
        data
      );

      if (response) {
        return response;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to update the article:", error);
    }
  }

  // Delete article
  async deleteArticle(articleId: string) {
    try {
      await this.databases.deleteDocument(
        appwrite.blogsDatabaseId,
        appwrite.articlesCollectionId,
        articleId
      );
    } catch (error) {
      console.error("Failed to delete the article:", error);
    }
  }

  // Get article by ID
  async getArticleById(articleId: string) {
    try {
      const response = await this.databases.getDocument(
        appwrite.blogsDatabaseId,
        appwrite.articlesCollectionId,
        articleId
      );

      if (response) {
        return response;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to get the article:", error);
    }
  }

  // Get published articles
  async getPublishedArticles() {
    try {
      const response = await this.databases.listDocuments(
        appwrite.blogsDatabaseId,
        appwrite.articlesCollectionId,
        [Query.equal("isPublished", true)]
      );

      if (response) {
        return response;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to get the published articles:", error);
    }
  }

  // Get all articles by user ID
  async getArticlesByUserId(userId: string) {
    try {
      const response = await this.databases.listDocuments(
        appwrite.blogsDatabaseId,
        appwrite.articlesCollectionId,
        [Query.equal("userId", userId)]
      );

      if (response) {
        return response;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to get articles by user ID:", error);
    }
  }
}

export default new DbService();

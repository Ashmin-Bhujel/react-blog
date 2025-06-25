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
  async createArticle(slug: string, data: ArticlesCollectionType) {
    try {
      const response = await this.databases.createDocument(
        appwrite.blogsDatabaseId,
        appwrite.articlesCollectionId,
        slug,
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
  async updateArticle(slug: string, data: Partial<ArticlesCollectionType>) {
    try {
      const response = await this.databases.updateDocument(
        appwrite.blogsDatabaseId,
        appwrite.articlesCollectionId,
        slug,
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
  async deleteArticle(slug: string) {
    try {
      await this.databases.deleteDocument(
        appwrite.blogsDatabaseId,
        appwrite.articlesCollectionId,
        slug
      );
    } catch (error) {
      console.error("Failed to delete the article:", error);
    }
  }

  // Get article by ID
  async getArticleById(slug: string) {
    try {
      const response = await this.databases.getDocument(
        appwrite.blogsDatabaseId,
        appwrite.articlesCollectionId,
        slug
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
}

export default new DbService();

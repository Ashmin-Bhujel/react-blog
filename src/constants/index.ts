// Environment variables
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const appwriteDatabaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const appwriteArticleCollectionId = import.meta.env
  .VITE_APPWRITE_ARTICLE_COLLECTION_ID;
const appwriteImagesBucketId = import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID;

// Exporting contants
export {
  appwriteProjectId,
  appwriteEndpoint,
  appwriteDatabaseId,
  appwriteArticleCollectionId,
  appwriteImagesBucketId,
};

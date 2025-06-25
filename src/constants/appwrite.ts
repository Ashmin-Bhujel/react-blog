// Environment variables
const appwrite = {
  endpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  blogsDatabaseId: String(import.meta.env.VITE_APPWRITE_BLOGS_DATABASE_ID),
  articlesCollectionId: String(
    import.meta.env.VITE_APPWRITE_ARTICLES_COLLECTION_ID
  ),
  imagesBucketId: String(import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID),
};

export default appwrite;

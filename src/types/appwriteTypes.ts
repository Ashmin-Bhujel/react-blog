export interface AccountAuthType {
  email: string;
  password: string;
  name?: string;
}

export interface ArticlesCollectionType {
  title: string;
  content: string;
  featuredImage: string;
  isPublished: boolean;
  userId: string;
}

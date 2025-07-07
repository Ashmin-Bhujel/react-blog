export interface ArticlesCollectionType {
  title: string;
  content: string;
  isPublished: boolean;
  userId: string;
}

export interface ExistingArticleType extends ArticlesCollectionType {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
}

import ArticleForm from "@/components/ArticleForm";
import type { ExistingArticleType } from "@/types/appwriteTypes";
import { useLoaderData } from "react-router-dom";

export default function ArticleEdit() {
  const existingArticle = useLoaderData<ExistingArticleType>();

  return <ArticleForm existingArticleData={existingArticle} />;
}

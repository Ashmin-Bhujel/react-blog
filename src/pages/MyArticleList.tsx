import type { StoreStateType } from "@/app/store";
import { dbService } from "@/appwrite";
import ArticleCard from "@/components/ArticleCard";
import type { ExistingArticleType } from "@/types/appwriteTypes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MyArticleList() {
  const [articles, setArticles] = useState<ExistingArticleType[]>([]);
  const userId = useSelector(
    (state: StoreStateType) => state.auth.userData?.$id as string
  );

  useEffect(() => {
    (async () => {
      const response = await dbService.getArticlesByUserId(userId);
      if (response?.documents && response.documents.length > 0) {
        setArticles(response.documents as unknown as ExistingArticleType[]);
      }
    })();
  }, [userId]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl">My Articles</h1>

      <section className="mt-8 flex flex-wrap gap-4">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.$id} article={article} />
          ))
        ) : (
          <p className="text-center text-xl">There are no articles</p>
        )}
      </section>
    </main>
  );
}

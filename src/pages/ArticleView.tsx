import { dbService } from "@/appwrite";
import type { ArticlesCollectionType } from "@/types/appwriteTypes";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import type { StoreStateType } from "@/app/store";
import { toast } from "sonner";

export default function ArticleView() {
  const [articleData, setArticleData] = useState<ArticlesCollectionType>();
  const { articleId } = useParams();
  const userId = useSelector(
    (state: StoreStateType) => state.auth.userData?.$id
  );
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (articleId) {
        const data = await dbService.getArticleById(articleId);
        if (data) {
          setArticleData(data as unknown as ArticlesCollectionType);
        }
      }
    })();
  }, [articleId]);

  async function handleDelete() {
    await dbService.deleteArticle(articleId as string);
    toast.success("Article deleted successfully!");
    navigate("/article/list");
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-center text-4xl font-semibold">
        {articleData?.title}
      </h1>

      <section className="my-8 bg-neutral-900 p-8">
        {articleData && parse(articleData?.content)}
      </section>

      {userId === articleData?.userId && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <Link to={`/article/edit/${articleId}`}>
            <Button variant={"outline"}>Edit</Button>
          </Link>

          <Button variant={"destructive"} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </main>
  );
}

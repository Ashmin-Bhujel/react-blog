import type { ExistingArticleType } from "@/types/appwriteTypes";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

export default function ArticleCard({
  article,
}: {
  article: ExistingArticleType;
}) {
  return (
    <Link to={`/article/${article.$id}`} key={article.$id}>
      <div className="flex flex-col gap-2 bg-neutral-900 p-8 transition-colors duration-300 ease-in-out hover:bg-neutral-800">
        <h3 className="text-2xl font-semibold">{article.title}</h3>
        <p>By: {article.userId}</p>
        <div className="flex flex-col text-sm text-neutral-400">
          <small>Created at: {article.$createdAt.split("T")[0]}</small>
          <small>Updated at: {article.$updatedAt.split("T")[0]}</small>
        </div>
        <Badge className="rounded-full">
          {article.isPublished ? "Published" : "Private"}
        </Badge>
      </div>
    </Link>
  );
}

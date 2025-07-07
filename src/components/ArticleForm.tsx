import type { StoreStateType } from "@/app/store";
import { dbService } from "@/appwrite";
import Tiptap from "@/components/Tiptap";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { ExistingArticleType } from "@/types/appwriteTypes";
import {
  ArticleFormSchema,
  type ArticleFormType,
} from "@/types/articleFormType";
import { zodResolver } from "@hookform/resolvers/zod";
import { ID } from "appwrite";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ArticleForm({
  existingArticleData,
}: {
  existingArticleData?: ExistingArticleType;
}) {
  const { isLoggedIn, userData } = useSelector(
    (state: StoreStateType) => state.auth
  );
  const navigate = useNavigate();

  // Article form
  const articleForm = useForm<ArticleFormType>({
    resolver: zodResolver(ArticleFormSchema),
    mode: "onChange",
    defaultValues: {
      title: existingArticleData?.title || "",
      content: existingArticleData?.content || "",
      isPublished: existingArticleData?.isPublished || false,
    },
  });

  async function onSubmit(data: ArticleFormType) {
    if (!existingArticleData) {
      // Create new article
      const articleId = ID.unique();
      if (userData?.$id) {
        dbService.createArticle(articleId, {
          ...data,
          userId: userData?.$id,
        });
      }

      toast.success("Article created successfully!");

      // Navigate to article view
      navigate(`/article/${articleId}`);
    } else {
      if (userData?.$id) {
        // Update data
        await dbService.updateArticle(existingArticleData.$id, {
          ...data,
          userId: userData.$id,
        });
      }

      toast.success("Article updated successfully!");

      // Navigate to article view
      navigate(`/article/${existingArticleData.$id}`);
    }
  }

  if (!isLoggedIn)
    return (
      <main className="container mx-auto p-4">
        <p className="text-center text-xl">You cannot add articles</p>
      </main>
    );

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl">
        {existingArticleData ? "Edit Article" : "Add Article"}
      </h1>

      <section className="mt-8 lg:max-w-3xl">
        <Form {...articleForm}>
          <form
            onSubmit={articleForm.handleSubmit(onSubmit)}
            id="add-article-form"
            className="space-y-6"
          >
            {/* Title */}
            <FormField
              control={articleForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="title"
                      {...field}
                      placeholder="Enter the article title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={articleForm.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Tiptap content={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Publish status */}
            <FormField
              control={articleForm.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publish Status</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" form="add-article-form" className="w-full">
              {existingArticleData ? "Update Article" : "Create Article"}
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}

import type { StoreStateType } from "@/app/store";
import { dbService, storageService } from "@/appwrite";
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
import {
  ArticleFormSchema,
  type ArticleFormType,
} from "@/types/articleFormType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function ArticleAdd() {
  const { isLoggedIn, userData } = useSelector(
    (state: StoreStateType) => state.auth
  );

  // Article form
  const articleForm = useForm<ArticleFormType>({
    resolver: zodResolver(ArticleFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      featuredImage: undefined,
      content: "",
      isPublished: false,
    },
  });

  async function onSubmit(data: ArticleFormType) {
    const imageData = await storageService.uploadFile(data.featuredImage);

    if (userData?.$id && imageData) {
      dbService.createArticle("example-slug", {
        ...data,
        featuredImage: imageData.$id,
        userId: userData?.$id,
      });
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
      <h1 className="text-4xl">Add Article</h1>

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

            {/* Featured image */}
            <FormField
              control={articleForm.control}
              name="featuredImage"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        onChange(file);
                      }}
                      {...field}
                      value={undefined}
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
              Add Article
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}

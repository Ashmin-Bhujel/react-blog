import z from "zod/v4";

// Article form schema
export const ArticleFormSchema = z.object({
  title: z.string().trim().nonempty("Title is required"),
  content: z.string().trim().nonempty("Content is required"),
  isPublished: z.boolean(),
});

// Article form type
export type ArticleFormType = z.infer<typeof ArticleFormSchema>;

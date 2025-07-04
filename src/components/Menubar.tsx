import { type Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Text,
} from "lucide-react";

export default function Menubar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 max-md:flex-wrap max-md:justify-center">
      <Toggle
        variant={"outline"}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        pressed={editor.isActive("heading", { level: 1 })}
      >
        <Heading1 />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        pressed={editor.isActive("heading", { level: 2 })}
      >
        <Heading2 />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        pressed={editor.isActive("heading", { level: 3 })}
      >
        <Heading3 />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() => editor.chain().focus().setParagraph().run()}
        pressed={editor.isActive("paragraph")}
      >
        <Text />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        pressed={editor.isActive("bold")}
      >
        <Bold />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        pressed={editor.isActive("italic")}
      >
        <Italic />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        pressed={editor.isActive("strike")}
      >
        <Strikethrough />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() =>
          editor.chain().focus().toggleHighlight({ color: "#006239" }).run()
        }
        pressed={editor.isActive("highlight")}
      >
        <Highlighter />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
        pressed={editor.isActive({ textAlign: "left" })}
      >
        <AlignLeft />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
        pressed={editor.isActive({ textAlign: "center" })}
      >
        <AlignCenter />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
        pressed={editor.isActive({ textAlign: "right" })}
      >
        <AlignRight />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("justify").run()
        }
        pressed={editor.isActive({ textAlign: "justify" })}
      >
        <AlignJustify />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        pressed={editor.isActive("bulletList")}
      >
        <List />
      </Toggle>

      <Toggle
        variant={"outline"}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        pressed={editor.isActive("orderedList")}
      >
        <ListOrdered />
      </Toggle>
    </div>
  );
}

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Unlink,
  Undo2,
  Redo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const toolbarBtn = (active: boolean) =>
  cn(
    "h-8 w-8 p-0",
    active && "bg-primary text-primary-foreground hover:bg-primary/90",
  );

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          class: "underline text-primary",
        },
      }),
    ],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[120px] px-3 py-2 font-body",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    },
  });

  // Sync external value changes (e.g. initial load) into the editor.
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "<p></p>";
    if (current !== next) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value]);

  if (!editor) return null;

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  return (
    <div className="border rounded-md bg-background">
      <div className="flex flex-wrap gap-1 border-b p-1">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={toolbarBtn(editor.isActive("heading", { level: 2 }))}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={toolbarBtn(editor.isActive("heading", { level: 3 }))}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </Button>
        <span className="w-px bg-border mx-1" />
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={toolbarBtn(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={toolbarBtn(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <span className="w-px bg-border mx-1" />
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={toolbarBtn(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bulleted list"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={toolbarBtn(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered list"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <span className="w-px bg-border mx-1" />
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={toolbarBtn(editor.isActive("link"))}
          onClick={setLink}
          title="Add / edit link"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          title="Remove link"
        >
          <Unlink className="w-4 h-4" />
        </Button>
        <span className="w-px bg-border mx-1" />
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;

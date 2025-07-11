import { useRef, useState } from "react";
import Button from "./Button";
import { MdOutlineAttachFile } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import TextareaAutosize from "react-textarea-autosize";
import { useCreatePost } from "@/hooks/useCreatePost";

function PostInput() {
  const [content, setContent] = useState("");
  const { createPost, isPending } = useCreatePost();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = e.target.files;
  //     if (files && files.length > 0) {
  //       // Handle file upload logic here
  //       console.log("Files selected:", files);
  //       // You can call createPost with the files if needed
  //       // createPost({ files });
  //     }
  //   };

  const handleCreatePost = () => {
    if (content.trim() === "") {
      return; // Prevent posting empty content
    }
    createPost({ content });
    setContent(""); // Clear the input after posting
  };

  return (
    <div className="flex flex-col w-full p-4 gap-4 shadow-sm rounded-2xl bg-[var(--color-grey-50)]/20">
      <div className="flex items-center ">
        <Button
          onClick={handleButtonClick}
          icon={<MdOutlineAttachFile />}
          className="text-xl py-0 hover:bg-[var(--color-brand-100)]/30 transition-all duration-300 ease-in-out rounded-lg"
        />
        <input type="file" ref={fileInputRef} className="hidden" multiple />
        <TextareaAutosize
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 resize-none rounded-lg focus:outline-none"
          minRows={1}
          placeholder="What's on your mind right now?"
        />
      </div>
      <div className="flex justify-end">
        <Button
          icon={<VscSend />}
          variation="post"
          iconEnd={true}
          onClick={handleCreatePost}
          disabled={isPending}
          className="hover:bg-[var(--color-brand-100)] transition-all duration-300 ease-in-out"
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default PostInput;

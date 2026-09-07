import ExternalLink from "@/components/ExternalLink";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import { truncateFilename } from "@/lib/utils";
import { FileTextIcon, UploadIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

export function FileInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileData, setFileData] = useState<File | null>(null);

  const fileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileData(file ? file : null);
  };

  const fileInputRemove = () => {
    setFileData(null);
    if (fileInputRef.current != null) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="file-upload"
        className="bg-card text-foreground hover:bg-accent border-border group hover:border-primary flex cursor-pointer flex-col items-center justify-center gap-5 rounded-md border-2 border-dashed px-8 py-4 text-base font-medium shadow-xs transition"
      >
        <UploadIcon className="h-20 w-auto transition duration-500 group-hover:-translate-y-2" />
        Choose Zip Folder
      </label>
      <input
        ref={fileInputRef}
        id="file-upload"
        type="file"
        accept=".zip"
        onChange={fileInputChange}
        className="hidden"
      />
      <Attachment className="w-full">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent className="flex flex-col items-center justify-center">
          {fileData ? (
            <>
              <AttachmentTitle>
                {truncateFilename(fileData.name)}
              </AttachmentTitle>
              <AttachmentDescription>
                {fileData.type} · {fileData.size} bytes
              </AttachmentDescription>
            </>
          ) : (
            <span className="flex flex-col items-center justify-center">
              <p>Not Sure? Visit:</p>
              <ExternalLink
                text="kz-zrm.netlify.app"
                link="https://kz-zrm.netlify.app/"
                size="sm"
              />
            </span>
          )}
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction
            aria-label={`Remove folder`}
            onClick={() => fileInputRemove()}
          >
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Button disabled={fileData ? false : true} size={"xl"}>
        Host
      </Button>
    </div>
  );
}

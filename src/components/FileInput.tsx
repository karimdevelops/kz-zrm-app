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
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import {
  FileQuestionMark,
  FileTextIcon,
  Globe,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

export function FileInput() {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [hostedUrl, setHostedUrl] = useState<string | null>(null);

  const fileInputRemove = () => {
    setFilePath(null);
  };

  const fileInputClick = async (path: string) => {
    await invoke<string>("unzip", {
      zipPath: path,
      folderName: "zrm",
    });
    const hostedUrl = await invoke<string>("host", {
      folderName: "zrm",
    });
    setHostedUrl(hostedUrl);
    setFilePath(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className="bg-card text-foreground hover:bg-accent border-border group hover:border-primary flex cursor-pointer flex-col items-center justify-center gap-5 rounded-md border-2 border-dashed px-8 py-4 text-base font-medium shadow-xs transition"
        onClick={async () => {
          const selectedPath = await open({
            multiple: false,
            filters: [{ name: "ZIP", extensions: ["zip"] }],
          });
          setFilePath(selectedPath);
        }}
      >
        <UploadIcon className="h-20 w-auto transition duration-500 group-hover:-translate-y-2" />
        Choose Zip Folder
      </div>
      <Attachment className="w-full">
        <AttachmentMedia>
          {filePath ? (
            <FileTextIcon />
          ) : hostedUrl ? (
            <Globe />
          ) : (
            <FileQuestionMark />
          )}
        </AttachmentMedia>
        <AttachmentContent className="flex flex-col items-center justify-center">
          {filePath ? (
            <>
              <AttachmentTitle>{truncateFilename(filePath)}</AttachmentTitle>
              <AttachmentDescription>
                {/* {filePath.type} · {filePath.size} bytes */}
              </AttachmentDescription>
            </>
          ) : hostedUrl ? (
            <ExternalLink link={hostedUrl} text={hostedUrl} size="sm" />
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
      <Button
        disabled={filePath ? false : true}
        className="cursor-pointer"
        size={"xl"}
        onClick={() => {
          if (filePath) fileInputClick(filePath);
        }}
      >
        Host
      </Button>
    </div>
  );
}

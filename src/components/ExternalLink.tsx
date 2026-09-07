import { openUrl } from "@tauri-apps/plugin-opener";

export default function ExternalLink({
  text,
  link,
  size,
}: {
  text: string;
  link: string;
  size: "sm" | "lg";
}) {
  return (
    <p
      className={`text-primary after:bg-primary hover:text-foreground relative isolate cursor-pointer px-2 ${size == "lg" ? "text-xl" : "text-sm after:hidden"} font-bold duration-200 after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-px after:min-w-full after:duration-200 hover:after:h-full`}
      onClick={() => openUrl(link)}
    >
      {text}
    </p>
  );
}

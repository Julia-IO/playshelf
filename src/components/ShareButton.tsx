import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShareButton({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = `https://playshelf.org/play/${slug}`;
    const text = `Play "${name}" for free on Playshelf`;
    const canNative = typeof navigator.share === "function" && window.matchMedia("(pointer: coarse)").matches;
    if (canNative) {
      try { await navigator.share({ title: name, text, url }); return; } catch (e) { if ((e as Error).name === "AbortError") return; }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link:", url);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <button onClick={share} className={cn("inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium hover:bg-accent", className)}>
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Link copied!" : "Share"}
    </button>
  );
}

import { Download, Share, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SaveDeviceGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="h-auto max-w-full justify-start whitespace-normal p-0 text-left text-xs text-muted-foreground">
          <Download aria-hidden="true" /> Save Playshelf to your device
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-lg text-foreground">
        <DialogHeader className="pr-5 text-left">
          <DialogTitle className="leading-snug">Save Playshelf to your device</DialogTitle>
          <DialogDescription>Keep games one tap or click away, in their own window.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="safari">
          <TabsList className="grid w-full grid-cols-2" aria-label="Browser instructions">
            <TabsTrigger value="safari">Safari</TabsTrigger>
            <TabsTrigger value="chrome">Chrome</TabsTrigger>
          </TabsList>
          <TabsContent value="safari" className="space-y-5 pt-3 text-sm leading-relaxed">
            <section>
              <h3 className="mb-2 flex items-center gap-2 font-medium"><Smartphone className="h-4 w-4" aria-hidden="true" /> iPhone & iPad</h3>
              <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
                <li>Open <strong className="font-medium text-foreground">playshelf.org</strong> in Safari, not inside Instagram or another app.</li>
                <li>Tap Safari’s <strong className="font-medium text-foreground">Share</strong> <Share className="inline h-4 w-4 align-text-bottom" aria-hidden="true" /> beside the address bar, or inside its <strong className="font-medium text-foreground">…</strong> menu—not the game’s Share button.</li>
                <li>Scroll down and choose <strong className="font-medium text-foreground">Add to Home Screen</strong>, then <strong className="font-medium text-foreground">Add</strong>. If “Open as Web App” appears, keep it on.</li>
                <li>Open Playshelf from your new home-screen icon.</li>
              </ol>
            </section>
            <section>
              <h3 className="mb-2 flex items-center gap-2 font-medium"><Monitor className="h-4 w-4" aria-hidden="true" /> Mac</h3>
              <p className="text-muted-foreground">In Safari, open playshelf.org and choose <strong className="font-medium text-foreground">File → Add to Dock → Add</strong>. Open it from the Dock. Requires macOS Sonoma or newer.</p>
            </section>
          </TabsContent>
          <TabsContent value="chrome" className="space-y-5 pt-3 text-sm leading-relaxed">
            <section>
              <h3 className="mb-2 flex items-center gap-2 font-medium"><Monitor className="h-4 w-4" aria-hidden="true" /> Computer</h3>
              <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
                <li>Open <strong className="font-medium text-foreground">playshelf.org</strong> in Chrome.</li>
                <li>Open <strong className="font-medium text-foreground">⋮ → Cast, save, and share → Install page as app…</strong> (or “Install Playshelf”).</li>
                <li>Choose <strong className="font-medium text-foreground">Install</strong>, then open Playshelf from your apps or its shortcut.</li>
              </ol>
            </section>
            <section>
              <h3 className="mb-2 flex items-center gap-2 font-medium"><Smartphone className="h-4 w-4" aria-hidden="true" /> Android</h3>
              <p className="text-muted-foreground">Open playshelf.org, tap <strong className="font-medium text-foreground">⋮ → Add to Home screen</strong> or <strong className="font-medium text-foreground">Install app</strong>, and confirm.</p>
            </section>
            <p className="text-muted-foreground">On iPhone or iPad, use the Safari steps if Chrome doesn’t offer Add to Home Screen. Menu wording varies by version; “Send to your devices” only sends a link—it doesn’t install the app.</p>
          </TabsContent>
        </Tabs>
        <p className="border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">Internet is still needed. Published games and updates reach saved apps too; reopen or refresh if you already have Playshelf open.</p>
      </DialogContent>
    </Dialog>
  );
}
<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->
- Games are static HTML files in public/games/ registered in src/data/resources.ts; played via /play/$slug iframe. Why: adding a game needs no backend.
- Game headers place the title above a two-column controls grid on phones, with a shrinking title in the desktop row; long names must not squeeze navigation or sharing controls.
- Multi-file HTML games live in their own public/games/ subdirectory; host bundled media through asset pointers and map original paths in the game to preserve instrument loading without repository binaries.
- Shared game ratings use aggregate-only public reads and validated database voting functions, with a random browser capability for editable votes; this avoids collecting child identities or exposing individual votes.
- GameRating is shared by catalog details and a separate play-header row, so rating controls never squeeze game navigation on phones.

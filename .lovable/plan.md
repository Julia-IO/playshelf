# Add "Contribute to Playshelf"

## What you'll see
- A new **Contribute** pill button in the top bar, next to Contact.
- Clicking it opens a small friendly window:
  - Title: "Contribute to Playshelf"
  - Text: "Every game and resource on Playshelf is free to use and share — at home, in class, anywhere. If you'd like to help keep the project growing, you're welcome to contribute. Thank you!"
  - A **Support Playshelf** button linking to a contribution page (e.g. Ko-fi or Buy Me a Coffee), opening in a new tab.
  - A close button.
- The same short "free to use and share" line added under the "Made with love by Julia Díez" text in the left menu, with a "Contribute" link that opens the same window.

## What I need from you
- The link where people will contribute (for example a Ko-fi page you create for free). Until then the button uses a placeholder link I'll flag clearly.

## Technical details
- New `src/components/ContributeDialog.tsx` using the existing shadcn Dialog, semantic theme tokens only.
- Contribution URL kept as one constant so it's easy to swap.
- Wire into header and sidebar blurb in `src/routes/index.tsx`.

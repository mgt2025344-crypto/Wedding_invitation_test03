# Animated Wedding Invitation Template

Pure HTML + CSS + JavaScript. No build step, no frameworks.

```
wedding-invitation/
├── index.html   (structure – rarely needs editing)
├── style.css    (design)
├── script.js    (CONFIG block at the top = all your details)
└── assets/
    ├── video/opening-video.mp4
    └── images/  bride.jpg, groom.jpg, venue.jpg, poster.jpg
```

**Almost everything is changed in the `CONFIG` block at the top of `script.js`.**

## 1. Replace the opening video
Put your new video in `assets/video/` and set `openingVideo` in `CONFIG`
(or just overwrite `opening-video.mp4`). Use H.264 MP4, under ~6 MB. A portrait 9:16 video
looks best on phones. On desktop it is shown uncropped over a blurred backdrop.
Also replace `assets/images/poster.jpg` (a frame from the video) so it appears while loading.

## 2. Replace Bride and Groom photos
Overwrite `assets/images/bride.jpg` and `groom.jpg`, or change `bridePhoto` / `groomPhoto`.
Use portrait photos at 4:5 ratio (e.g. 800×1000 px), under 200 KB each.

## 3. Replace the hotel image
Overwrite `assets/images/venue.jpg` or change `venueImage`. Use landscape 14:9 (e.g. 1400×900 px).

## 4. Change names and wedding details
Edit `brideName`, `groomName`, `weddingTimeText`, `venueName`, `venueAddress`, the intro texts,
messages and the `schedule` list (each entry: `time`, `title`, `desc`, `icon`).

## 5. Change the wedding date and countdown
Edit `weddingDate`, format `YYYY-MM-DDTHH:MM:SS+05:30` (e.g. `2027-02-14T10:00:00+05:30`).
The hero date, flip card, venue text and countdown all update from this single value.

## 6. Replace the Google Maps embed URL
Google Maps → search your venue → **Share** → **Embed a map** → copy only the URL inside `src="..."`
→ paste into `googleMapsEmbedUrl`.

## 7. Replace the directions URL
Google Maps → your venue → **Share** → **Send a link** → copy → paste into `googleMapsDirectionsUrl`.

## 8. Change theme colours
Edit `theme` in `CONFIG` (`lavender`, `lavenderSoft`, `ivory`, `gold`, `ink`).

## 9. Deploy on Cloudflare Pages
1. Upload this folder to a GitHub repository (or choose **Direct Upload** in Cloudflare Pages and drag the folder in).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build command: *(leave empty)*. Build output directory: `/` (root).
4. Click **Save and Deploy**. Add a custom domain under **Custom domains** if you like.

## Notes
- The video tries to play with sound; browsers normally block that, so it starts muted and sound turns on at the first tap.
  If a browser blocks autoplay entirely, "Tap anywhere to begin" appears (no button).
- Animations respect the device's "reduce motion" setting.
- Fonts (Cormorant Garamond, Jost) load from Google Fonts with safe fallbacks.
- The included photos are placeholders – replace them before sending.

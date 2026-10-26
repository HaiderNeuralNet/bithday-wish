# Sunflower Birthday Website 🌻

A static, mobile-first birthday gift site in plain HTML, CSS and JavaScript. No build step, backend, database or API keys.

## Structure

```text
birthday-website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── photos/   (optional: photo1.jpg ... photo6.jpg)
    └── audio/    (optional: birthday-music.mp3)
```

## Customize (all at the top of `script.js`)

- Name: change `FRIEND_NAME`.
- Birthday: change `BIRTHDAY_DATE` to `"YYYY-MM-DD"`. Only month and day matter. It uses the visitor's local timezone. Past dates roll to next year. Feb 29 becomes Feb 28 in non-leap years.
- Letter: edit the `LETTER` array. `[FRIEND_NAME]` is replaced automatically.
- Wishes: edit `WISHES` and `FINAL_WISHES`.

## Photos

The gallery ships with built-in sunflower, bouquet, cake, gift and garden illustrations (self-contained SVG), so it looks complete with no files.

To replace one, edit its entry in `galleryImages` and set `src`:

- Local: `src: "assets/photos/photo1.jpg"`
- Remote: `src: "https://example.com/image.jpg"`
- Empty `src: ""` uses the built-in illustration. If an image fails to load, the illustration is shown automatically.

I did not verify any Unsplash URLs, so none are included. To use Unsplash, open a photo page, copy its image URL (images.unsplash.com/...) and check the Unsplash license.

## Music

Set `MUSIC_MODE`:

- `"synth"` (default): a gentle original melody generated in the browser. No file, no licensing issue.
- `"local"`: plays `assets/audio/birthday-music.mp3` (`MUSIC_LOCAL`).
- `"remote"`: plays `MUSIC_URL`. Only use a track whose license allows your use.

Music never autoplays. If audio fails, a friendly message appears and the site keeps working.

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` in the folder and visit `http://localhost:8000`.

## Test on your phone

Run the local server, find your computer's IP address, and open `http://YOUR-IP:8000` on a phone on the same Wi-Fi. Or deploy first and open the live link.

## Deploy to Netlify

1. Go to app.netlify.com, then Add new site, then Deploy manually.
2. Drag the whole `birthday-website` folder in.
3. Open the URL Netlify gives you and test it on a phone.
4. For GitHub: push the folder to a repo, choose Import from Git, leave the build command empty and set the publish directory to `.`.
5. To update, redeploy the folder or push a commit.

## Deploy to AWS (S3)

Option A, S3 website endpoint (HTTP only):
1. Create an S3 bucket and upload all files.
2. Properties, then Static website hosting: enable it, with index document `index.html`.
3. Turn off Block Public Access for this bucket and add a bucket policy allowing `s3:GetObject` on `arn:aws:s3:::YOUR-BUCKET/*` for principal `*`.
4. Open the website endpoint. This endpoint does not support HTTPS.

Option B, CloudFront with a private bucket (HTTPS, recommended):
1. Keep Block Public Access on.
2. Create a CloudFront distribution with the bucket as origin, using Origin Access Control, and set the default root object to `index.html`.
3. Apply the bucket policy CloudFront suggests, wait for deployment, and open the `https://xxxx.cloudfront.net` URL.

## Troubleshooting

- Name or date not updating: save `script.js`, then hard refresh.
- Photo not showing: check the path and filename case, or that the URL is public HTTPS. The illustration appears meanwhile.
- No sound: tap the music button, check the phone is not on silent, and confirm `MUSIC_MODE`.
- Old version after deploy: hard refresh or clear the cache.

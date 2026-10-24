# Swadeshi Innovators — Weave Kiran

MERN-ready portal for the Swadeshi Innovators team and the Weave Kiran AI fabric defect detector.

## Run locally

```bash
npm install
copy server/.env.example server/.env
npm run dev
```

- React + Vite runs at `http://localhost:5173`
- Express API runs at `http://localhost:5000`
- Set `MONGO_URI` in `server/.env` to persist inquiries in MongoDB

Without MongoDB, the API remains usable and logs inquiry payloads as a safe development fallback.

## Event visitor question page

Open `http://localhost:5173/visitor-question` on the event display. For the QR code to work on visitors' phones, open the display with your laptop's LAN address (for example, `http://192.168.x.x:5173/visitor-question`) or set `VITE_EVENT_QR_URL` to the public event URL before starting the client. Submissions are appended to `server/data/visitor-questions.xlsx`, with the visitor's name, mobile number, question, input method, and submission time.

To show a real demonstration video on this page, set `DEMO_VIDEO_CONFIG.videoUrl` in `client/src/data/websiteContent.js` to an embeddable YouTube/Vimeo URL or local video embed URL.

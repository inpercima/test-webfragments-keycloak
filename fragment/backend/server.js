import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 8000;

const angularDistPath = "../frontend/dist/frontend/browser";

// static serving must be AFTER web fragment middleware
app.use(express.static(angularDistPath));

// all other routes should serve the Angular app
app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: angularDistPath });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:8000");
});

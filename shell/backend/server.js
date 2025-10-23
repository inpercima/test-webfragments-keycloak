import express from "express";
import { FragmentGateway } from "web-fragments/gateway";
import { getNodeMiddleware } from "web-fragments/gateway/node";

const app = express();
const PORT = 3000;

// initialize the gateway
const myGateway = new FragmentGateway();

myGateway.registerFragment({
  // a unique ID of the fragment
  fragmentId: "fragment-1",
  iframeHeaders: {
    "Content-Security-Policy": `default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' data: blob:; style-src * 'unsafe-inline' data:; img-src * data: blob:; font-src * data:; connect-src * ws: wss:; frame-src *; child-src *; frame-ancestors *;`,
  },
  piercingClassNames: [],
  endpoint: "http://localhost:8000/",
  routePatterns: [
    // url pattern for fetching all assets of this fragment, this pattern is determined by the fragment and should be unique:
    "/test/:_*",
    // routable url in the final application where this fragment will be initialized (adjust as needed per step 2c):
    "/",
  ],
});

app.use(getNodeMiddleware(myGateway, { mode: "development" }));

const angularDistPath = "../frontend/dist/frontend/browser";

// static serving must be AFTER web fragment middleware
app.use(express.static(angularDistPath));

// all other routes should serve the Angular app
app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: angularDistPath });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});

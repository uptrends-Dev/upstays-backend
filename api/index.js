import app from "../app.js";

// Vercel will call this handler for each request. We export a compatible handler.
// @vercel/node will accept a default export that is a function (req,res) —
// but we can reuse the Express app by forwarding requests to it.
export default function handler(req, res) {
  return app(req, res);
}

import { Router } from "express";
import * as http from "http";
import * as https from "https";

import {
  deleteUser,
  // getUsers,
  registerUser,
  updateUser,
} from "../controllers/userController";
// import { errorHandler } from "../errorHandler";


const router: Router = Router();

router.get("/proxy-image", (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const imageUrl = new URL(url);
    const client = imageUrl.protocol === "https:" ? https : http;

    client
      .get(imageUrl, (imageRes: http.IncomingMessage) => {
        if (imageRes.statusCode !== 200) {
          return res.status(502).send("Failed to fetch image");
        }
        res.setHeader(
          "Content-Type",
          imageRes.headers["content-type"] || "image/jpeg",
        );
        imageRes.pipe(res);
      })
      .on("error", () => {
        res.status(500).send("Error fetching image");
      });
  } catch {
    res.status(400).send("Invalid url parameter");
  }
});

// router.get("/get", errorHandler(getUsers));
router.post("/register", registerUser);
router.patch("/update", updateUser);
// router.delete("/delete", deleteUser);
router.delete("/delete/:id", deleteUser);

export default router;

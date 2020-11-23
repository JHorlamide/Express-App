import express from "express";
import { logger } from "../middleware/loggin.js";
import { auth } from "../middleware/auth.js";
import {
  deletePost,
  getAllData,
  getDataById,
  postData,
  testRoute,
  updateData,
} from "../controller/controller.js";

const router = express.Router();

router.get("/:name/:id", testRoute);
router.get("/", logger, getAllData);
router.get("/:id", auth, getDataById);
router.post("/", postData);
router.patch("/:id", updateData);
router.delete("/:id", deletePost);

export default router;

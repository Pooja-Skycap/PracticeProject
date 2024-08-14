import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUserDetails,
  updateuser,
} from "../controllers/UserControllers";
const router = express.Router();

router.post("/create", createUser);
router.get("/getbyid/:userId", getUserDetails);
router.get("/get", getUser);
router.delete("/delete/:userId", deleteUser);
router.patch("/edit/:userId", updateuser);

export default router;

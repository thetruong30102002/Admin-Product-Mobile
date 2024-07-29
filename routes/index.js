// code base

import { Router } from "express";
import mobileRouter from "./mobile";
import authRouter from "./auth";

const router = Router();

router.get('/', (req, res) => {
    res.send("Home");
})
router.use("/mobiles", mobileRouter);
router.use("/auth", authRouter);

export default router;

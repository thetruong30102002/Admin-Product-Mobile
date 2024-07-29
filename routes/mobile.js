// code base

import { Router } from "express";
import MobileController from "../controllers/mobile";


const mobileRouter = Router();
const mobileController = new MobileController();


mobileRouter.get('/', mobileController.getAllMobile);
mobileRouter.get('/:id', mobileController.detailMobile);
mobileRouter.post('/', mobileController.createMobile);
mobileRouter.put('/:id', mobileController.updateMobile);
mobileRouter.delete('/:id', mobileController.deleteMobile);

export default mobileRouter;
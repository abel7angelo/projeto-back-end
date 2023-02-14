import { Router } from "express";

import Usercontroller from "./controllers/Usercontroller";

const router = Router();

router.post("/user", Usercontroller.createUser);
router.get("/users", Usercontroller.findallUsers);
router.get("/user/:id", Usercontroller.findUser);
router.put("/user/:id", Usercontroller.updateUser);
router.delete("/user/:id", Usercontroller.deleteUser);

export default router;

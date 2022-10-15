const express=require("express");
const router=express.Router();
const { signIn, signUp, destroy, list} = require("../controllers/UserController");
const authorization = require("../middlewares/authorization")

router.delete("/:id", authorization, destroy);
router.get("/list", authorization, list);
router.post("/sign-up", authorization, signUp);
router.post("/sign-in", authorization, signIn);

module.exports = router;

const router = require("express").Router();
const passport = require("passport");
const dotenv = require("dotenv")
dotenv.config();

const Client_Url = process.env.CLIENT_URL;
console.log("WIthin auth")
console.log(Client_Url,"-----")
router.get("/login/success", (req, res) => {
	console.log(req.user,"requested user")
	if (req.user) {

		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));


router.get(
	"/google/callback",

	passport.authenticate("google", {
		successRedirect: `${process.env.CLIENT_URL}Dashboard`,
		failureRedirect: "https://paramscience.org/",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(Client_Url);
});

module.exports = router;


//gdhdehdyjjsjkkj

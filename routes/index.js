const express = require("express");
const router = express.Router();
const { error404, errorHandler } = require("./middleware/errorHandler");

router.use(require("morgan")("dev"));
router.use(express.json());

router.use(require("../api/auth").router);
router.use("/reservations", require("../api/reservations"));
router.use("/restaurants", require("../api/restaurants"));

router.use(error404);

module.exports = {
	routes: router,
	errorHandler,
};

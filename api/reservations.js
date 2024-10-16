const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");
// Notice we use {} when importing `authenticate` because it is not the only export
const { authenticate } = require("./auth");

router.get("/", authenticate, async (req, res, next) => {
	// TODO: Send reservations made by the logged in customer
	try {
		res.json({
			reservations: await prisma.reservation.findMany({
				where: { customerId: req.customer.id },
				include: { restaurant: true },
			}),
		});
	} catch (e) {
		next(e);
	}
});

// TODO: POST /
router.post("/", authenticate, async (req, res, next) => {
	try {
		// create new reservation
		const { partySize, restaurantId } = req.body;

		res.status(201).json({
			reservation: await prisma.reservation.create({
				data: {
					partySize,
					restaurant: { connect: { id: restaurantId } },
					customer: { connect: { id: req.customer.id } },
				},
			}),
		});
	} catch (e) {
		next(e);
	}
});

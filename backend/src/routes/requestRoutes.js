const express = require("express");

const requestController = require("../controllers/requestController");

const router = express.Router();

router.post("/", requestController.createRequest);

router.get("/", requestController.getRequests);

router.get("/:id", requestController.getRequestById);

router.patch("/:id", requestController.updateRequestStatus);

module.exports = router;
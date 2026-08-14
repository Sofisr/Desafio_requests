const requestService = require("../services/requestService");


const {
    validStatuses,
    validPriorities,
    validCategories,
    validLocations
} = require("../utils/validation");

const createRequest = async (req, res) => {
    try {
        console.log("BODY RECEIVED:", req.body);

        const request = await requestService.createRequest(req.body);

        res.status(201).json(request);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create request",
            error: error.message
        });
    }
};

const getRequests = async (req, res) => {
    try {
        const {
            status,
            priority,
            category,
            location
        } = req.query;

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status",
                allowedValues: validStatuses
            });
        }

        if (priority && !validPriorities.includes(priority)) {
            return res.status(400).json({
                message: "Invalid priority",
                allowedValues: validPriorities
            });
        }

        if (category && !validCategories.includes(category)) {
            return res.status(400).json({
                message: "Invalid category",
                allowedValues: validCategories
            });
        }

        if (location && !validLocations.includes(location)) {
            return res.status(400).json({
                message: "Invalid location",
                allowedValues: validLocations
            });
        }

        const requests = await requestService.getRequests({
            status,
            priority,
            category,
            location
        });

        res.status(200).json(requests);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch requests"
        });
    }
};

module.exports = {
    createRequest,
    getRequests
};
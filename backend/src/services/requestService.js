const prisma = require("./prisma");

const createRequest = async (data) => {
    return prisma.request.create({
        data: {
            title: data.title,
            description: data.description,
            category: data.category,
            priority: data.priority,
            location: data.location
        }
    });
};

const getRequests = async (filters = {}) => {
    const where = {};

    if (filters.status) {
        where.status = filters.status;
    }

    if (filters.priority) {
        where.priority = filters.priority;
    }

    if (filters.category) {
        where.category = filters.category;
    }

    if (filters.location) {
        where.location = filters.location;
    }

    return prisma.request.findMany({
        where,
        orderBy: {
            createdAt: "desc"
        }
    });
};



module.exports = {
    createRequest,
    getRequests
};
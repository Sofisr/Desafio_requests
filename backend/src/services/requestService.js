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

const getRequestById = async (id) => {
    return prisma.request.findUnique({
        where: {
            id: Number(id)
        }
    });
};

const updateRequestStatus = async (id, status) => {
    return prisma.request.update({
        where: {
            id: Number(id)
        },
        data: {
            status
        }
    });
};

module.exports = {
    createRequest,
    getRequests,
    getRequestById,
    updateRequestStatus
};
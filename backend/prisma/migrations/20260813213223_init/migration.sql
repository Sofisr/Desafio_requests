-- CreateEnum
CREATE TYPE "RequestCategory" AS ENUM ('IT', 'MAINTENANCE', 'EQUIPMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "RequestPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'RESOLVED');

-- CreateEnum
CREATE TYPE "RequestLocation" AS ENUM ('MADEIRA', 'PORTUGAL_MAINLAND', 'MOROCCO');

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "RequestCategory" NOT NULL,
    "priority" "RequestPriority" NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'NEW',
    "location" "RequestLocation" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

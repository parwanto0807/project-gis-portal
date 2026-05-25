-- CreateEnum
CREATE TYPE "AppModule" AS ENUM ('DASHBOARD', 'PROCUREMENT', 'INVENTORY', 'FINANCE', 'SALES', 'HR', 'SETTINGS', 'VENDOR_PORTAL');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('READ', 'CREATE', 'UPDATE', 'DELETE', 'APPROVE', 'EXPORT', 'MANAGE');

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "module" "AppModule" NOT NULL,
    "actions" "Action"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_userId_module_key" ON "permissions"("userId", "module");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

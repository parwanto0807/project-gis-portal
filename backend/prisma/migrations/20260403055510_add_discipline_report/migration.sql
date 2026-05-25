-- CreateTable
CREATE TABLE "discipline_reports" (
    "id" SERIAL NOT NULL,
    "reporterId" INTEGER NOT NULL,
    "targetEmployeeId" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "photoUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discipline_reports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "discipline_reports" ADD CONSTRAINT "discipline_reports_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

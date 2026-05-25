-- AlterTable
ALTER TABLE "discipline_reports" ADD COLUMN     "actionTaken" TEXT,
ADD COLUMN     "handledAt" TIMESTAMP(3),
ADD COLUMN     "handledById" INTEGER,
ADD COLUMN     "improvementPlan" TEXT;

-- AddForeignKey
ALTER TABLE "discipline_reports" ADD CONSTRAINT "discipline_reports_handledById_fkey" FOREIGN KEY ("handledById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

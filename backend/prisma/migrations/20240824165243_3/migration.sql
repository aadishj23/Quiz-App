-- DropForeignKey
ALTER TABLE "QuizData" DROP CONSTRAINT "QuizData_userId_fkey";

-- AlterTable
ALTER TABLE "QuizData" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "QuizData" ADD CONSTRAINT "QuizData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

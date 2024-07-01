/*
  Warnings:

  - You are about to drop the column `userId` on the `UserAuth` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userAuthId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userAuthId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `UserAuth_userId_key` ON `UserAuth`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `userAuthId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `UserAuth` DROP COLUMN `userId`;

-- CreateIndex
CREATE UNIQUE INDEX `User_userAuthId_key` ON `User`(`userAuthId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userAuthId_fkey` FOREIGN KEY (`userAuthId`) REFERENCES `UserAuth`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Made the column `secretAnswer` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `secretQuestion` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `secretAnswer` VARCHAR(191) NOT NULL,
    MODIFY `secretQuestion` VARCHAR(191) NOT NULL;

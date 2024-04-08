/*
  Warnings:

  - You are about to drop the column `details` on the `Card` table. All the data in the column will be lost.
  - Added the required column `cvv` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Card` DROP COLUMN `details`,
    ADD COLUMN `cvv` VARCHAR(191) NOT NULL,
    ADD COLUMN `month` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `number` VARCHAR(191) NOT NULL,
    ADD COLUMN `year` VARCHAR(191) NOT NULL;

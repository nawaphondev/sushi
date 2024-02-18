/*
  Warnings:

  - You are about to drop the column `orderId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_orderId_fkey`;

-- AlterTable
ALTER TABLE `Order` MODIFY `paymentId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `orderId`;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

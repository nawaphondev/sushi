/*
  Warnings:

  - You are about to drop the column `productId` on the `ShoppingCart` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `ShoppingCart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ShoppingCart` DROP FOREIGN KEY `ShoppingCart_productId_fkey`;

-- AlterTable
ALTER TABLE `ShoppingCart` DROP COLUMN `productId`,
    DROP COLUMN `quantity`;

-- CreateTable
CREATE TABLE `ShoppingCartItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `shoppingCartId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShoppingCartItem` ADD CONSTRAINT `ShoppingCartItem_shoppingCartId_fkey` FOREIGN KEY (`shoppingCartId`) REFERENCES `ShoppingCart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingCartItem` ADD CONSTRAINT `ShoppingCartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

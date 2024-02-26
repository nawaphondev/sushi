-- DropForeignKey
ALTER TABLE `shoppingcartitem` DROP FOREIGN KEY `ShoppingCartItem_productId_fkey`;

-- AddForeignKey
ALTER TABLE `ShoppingCartItem` ADD CONSTRAINT `ShoppingCartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

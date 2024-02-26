-- DropForeignKey
ALTER TABLE `shoppingcart` DROP FOREIGN KEY `ShoppingCart_userId_fkey`;

-- AddForeignKey
ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

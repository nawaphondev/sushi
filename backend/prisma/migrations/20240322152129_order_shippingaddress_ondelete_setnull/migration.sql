-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_shippingAddressId_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `shippingAddressId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `ShippingAddress`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_productSKU_fkey";

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_productSKU_fkey" FOREIGN KEY ("productSKU") REFERENCES "Product"("SKU") ON DELETE CASCADE ON UPDATE CASCADE;

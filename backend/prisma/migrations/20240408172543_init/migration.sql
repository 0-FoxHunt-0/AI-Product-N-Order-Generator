-- CreateTable
CREATE TABLE "Product" (
    "SKU" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "providerPrice" DOUBLE PRECISION NOT NULL,
    "brand" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("SKU")
);

-- CreateTable
CREATE TABLE "Tag" (
    "SKU" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "productSKU" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("SKU")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_productSKU_fkey" FOREIGN KEY ("productSKU") REFERENCES "Product"("SKU") ON DELETE SET NULL ON UPDATE CASCADE;

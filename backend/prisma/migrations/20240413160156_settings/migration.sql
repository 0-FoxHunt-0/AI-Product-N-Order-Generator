-- CreateTable
CREATE TABLE "OrderSettings" (
    "id" TEXT NOT NULL,
    "orderNum" INTEGER NOT NULL,
    "productCount" INTEGER[],
    "subject" TEXT,

    CONSTRAINT "OrderSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSettings" (
    "id" TEXT NOT NULL,
    "productCount" INTEGER NOT NULL,
    "subject" TEXT,

    CONSTRAINT "ProductSettings_pkey" PRIMARY KEY ("id")
);

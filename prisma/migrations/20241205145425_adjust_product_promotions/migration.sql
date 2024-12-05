/*
  Warnings:

  - You are about to drop the column `promotion_description` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `promotion_price` on the `products` table. All the data in the column will be lost.
  - Added the required column `description` to the `promotion_times` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `promotion_times` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "promotion_description",
DROP COLUMN "promotion_price";

-- AlterTable
ALTER TABLE "promotion_times" ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL;

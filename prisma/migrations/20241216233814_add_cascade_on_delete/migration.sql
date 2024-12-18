-- DropForeignKey
ALTER TABLE "opening_hours" DROP CONSTRAINT "opening_hours_restaurant_id_fkey";

-- AddForeignKey
ALTER TABLE "opening_hours" ADD CONSTRAINT "opening_hours_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

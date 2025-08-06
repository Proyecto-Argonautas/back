-- DropForeignKey
ALTER TABLE "public"."travel" DROP CONSTRAINT "travel_user_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."travel" ADD CONSTRAINT "travel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

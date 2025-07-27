-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "secret" TEXT,
    "name" TEXT NOT NULL,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profile_img" TEXT,
    "resumeResume_id" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Travel" (
    "travel_id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "destiny" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("travel_id")
);

-- CreateTable
CREATE TABLE "Companions" (
    "companions_id" SERIAL NOT NULL,
    "travelId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Companions_pkey" PRIMARY KEY ("companions_id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "resume_id" SERIAL NOT NULL,
    "component" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("resume_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_userId_key" ON "Resume"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_resumeResume_id_fkey" FOREIGN KEY ("resumeResume_id") REFERENCES "Resume"("resume_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companions" ADD CONSTRAINT "Companions_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel"("travel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

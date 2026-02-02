-- CreateTable
CREATE TABLE "MedicalService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "specialty" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "reviewCount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "KeyFeature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "feature" TEXT NOT NULL,
    "medicalServiceId" TEXT NOT NULL,
    CONSTRAINT "KeyFeature_medicalServiceId_fkey" FOREIGN KEY ("medicalServiceId") REFERENCES "MedicalService" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hospital" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "reviewCount" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "establishedYear" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Specialty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    CONSTRAINT "Specialty_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Accreditation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    CONSTRAINT "Accreditation_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TreatmentProgram" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hospitalId" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "basePrice" REAL NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    CONSTRAINT "TreatmentProgram_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Include" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item" TEXT NOT NULL,
    "treatmentProgramId" TEXT NOT NULL,
    CONSTRAINT "Include_treatmentProgramId_fkey" FOREIGN KEY ("treatmentProgramId") REFERENCES "TreatmentProgram" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "beds" INTEGER NOT NULL,
    "doctors" INTEGER NOT NULL,
    "surgeryRooms" INTEGER NOT NULL,
    "hospitalId" TEXT NOT NULL,
    CONSTRAINT "Stats_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Roadmap" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "treatmentProgramId" TEXT NOT NULL,
    CONSTRAINT "Roadmap_treatmentProgramId_fkey" FOREIGN KEY ("treatmentProgramId") REFERENCES "TreatmentProgram" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Stats_hospitalId_key" ON "Stats"("hospitalId");

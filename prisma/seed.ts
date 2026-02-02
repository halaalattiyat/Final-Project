import { PrismaClient } from '@prisma/client';
import { MEDICAL_SERVICES, HOSPITALS, PROGRAMS } from '../data/seedData';

const prisma = new PrismaClient();

async function main() {
  // Seed Medical Services
  for (const service of MEDICAL_SERVICES) {
    await prisma.medicalService.create({
      data: {
        id: service.id,
        specialty: service.specialty,
        titleAr: service.titleAr,
        titleEn: service.titleEn,
        descriptionAr: service.descriptionAr,
        icon: service.icon,
        rating: service.rating,
        reviewCount: service.reviewCount,
        keyFeatures: {
          create: service.keyFeatures.map((feature) => ({ feature })),
        },
      },
    });
  }

  // Seed Hospitals
  for (const hospital of HOSPITALS) {
    await prisma.hospital.create({
      data: {
        id: hospital.id,
        nameAr: hospital.nameAr,
        nameEn: hospital.nameEn,
        location: hospital.location,
        type: hospital.type,
        category: hospital.category,
        rating: hospital.rating,
        reviewCount: hospital.reviewCount,
        specialties: {
          create: hospital.specialties.map((specialty) => ({ name: specialty })),
        },
        image: hospital.image,
        description: hospital.description,
        accreditations: {
          create: hospital.accreditations.map((accreditation) => ({ name: accreditation })),
        },
        establishedYear: hospital.establishedYear,
        stats: {
          create: {
            beds: hospital.stats.beds,
            doctors: hospital.stats.doctors,
            surgeryRooms: hospital.stats.surgeryRooms,
          },
        },
      },
    });
  }

  // Seed Treatment Programs
  for (const program of PROGRAMS) {
    await prisma.treatmentProgram.create({
      data: {
        id: program.id,
        hospitalId: program.hospitalId,
        specialty: program.specialty,
        titleAr: program.titleAr,
        titleEn: program.titleEn,
        durationDays: program.durationDays,
        basePrice: program.basePrice,
        descriptionAr: program.descriptionAr,
        includes: {
          create: program.includes.map((item) => ({ item })),
        },
        roadmap: {
          create: program.roadmap.map((step) => ({
            day: step.day,
            titleAr: step.titleAr,
            descriptionAr: step.descriptionAr,
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seeding completed successfully!');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
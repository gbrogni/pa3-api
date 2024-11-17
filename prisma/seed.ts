import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const accommodation = await prisma.accommodation.create({
    data: {
      name: 'Villa de Luxo',
      description: 'Villa de luxo com piscina e churrasqueira',
      price: 1000,
      slug: 'villa-de-luxo',
    }
  });

  const imageUrls = [
    'https://pub-dd86740444cc4d4ca2bdd74d1cf76fd3.r2.dev/villa-de-luxo3.jpg.jpg',
    'https://pub-dd86740444cc4d4ca2bdd74d1cf76fd3.r2.dev/villa-de-luxo4.jpg.jpg',
  ];

  await Promise.all(imageUrls.map(url => prisma.image.create({
    data: {
      url: url,
      accommodationId: accommodation.id,
    },
  })));
}

seed().then(() => {
  console.log('Database seeded!');
});
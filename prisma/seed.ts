// import { City, Hotel, HotelReview, HotelRoom, PrismaClient, User } from '@prisma/client';

// import { cities } from './cities';
// import { countries } from './countries';
// import hotels from './hotels.json';
// import users from './users.json';

// const prisma = new PrismaClient();

// async function loadCountries() {
//   const formattedCountries = countries.map((country) => ({
//     id: country._id.$oid,
//     name: country.name,
//     image: country.photo,
//     isFeatured: country.isFeatured,
//   }));

//   await prisma.country.createMany({
//     data: formattedCountries,
//   });
// }

// async function loadCities() {
//   const formattedCities = cities.map((city) => ({
//     id: city._id.$oid,
//     name: city.name,
//     isFeatured: city.isFeatured,
//     countryId: city.country.$oid,
//   }));

//   await prisma.city.createMany({
//     data: formattedCities,
//   });
// }

// async function loadCitiesImages() {
//   const citiesImages = [];

//   for (const city of cities) {
//     for (const image of city.photos) {
//       citiesImages.push({
//         cityId: city._id.$oid,
//         image: image,
//       });
//     }
//   }

//   await prisma.cityImage.createMany({
//     data: citiesImages,
//   });
// }

// async function loadHotelsCategories() {
//   const hotelsCategories: { name: string }[] = [];

//   for (const hotel of hotels) {
//     const isExist = hotelsCategories.find((category) => category.name === hotel.category);

//     if (isExist) {
//       continue;
//     }

//     hotelsCategories.push({
//       name: hotel.category,
//     });
//   }

//   return prisma.hotelCategory.createMany({
//     data: hotelsCategories,
//   });
// }

// async function loadHotels() {
//   const hotelsCategories = await prisma.hotelCategory.findMany();

//   const formattedHotels = [];

//   for (const hotel of hotels) {
//     const category = hotelsCategories.find((category) => category.name === hotel.category);

//     if (!category) {
//       continue;
//     }

//     const formattedHotel = {
//       id: hotel._id.$oid,
//       name: hotel.name,
//       description: hotel.desc,
//       stars: hotel.stars,
//       address: hotel.address,
//       cityId: hotel.city.$oid,
//       categoryId: category.id,
//       distanceToDTInKm: hotel.distanceToDTInKm,
//       isFeatured: hotel.isFeatured,
//     };

//     formattedHotels.push(formattedHotel);
//   }

//   return prisma.hotel.createMany({
//     data: formattedHotels,
//   });
// }

// async function loadHotelsImages() {
//   const hotelsImages = [];

//   for (const hotel of hotels) {
//     for (const image of hotel.photos) {
//       hotelsImages.push({
//         hotelId: hotel._id.$oid,
//         image: image,
//       });
//     }
//   }

//   return prisma.hotelImage.createMany({
//     data: hotelsImages,
//   });
// }

// async function loadHotelsRooms() {
//   const hotelsRooms: HotelRoom[] = [];

//   for (const hotel of hotels) {
//     for (const room of hotel.rooms) {
//       hotelsRooms.push({
//         id: room._id.$oid,
//         hotelId: hotel._id.$oid,
//         name: room.name,
//         beds: room.beds,
//         maxAdults: room.maxPeople.adults,
//         price: room.currentPrice,
//         maxChildren: room.maxPeople.children,
//       });
//     }
//   }

//   return prisma.hotelRoom.createMany({
//     data: hotelsRooms,
//   });
// }

// async function loadHotelsFeatures() {
//   const hotelsFeatures: { name: string }[] = [];

//   for (const hotel of hotels) {
//     for (const feature of hotel.features) {
//       const isExist = hotelsFeatures.find((hotelFeature) => hotelFeature.name === feature);

//       if (isExist) {
//         continue;
//       }

//       hotelsFeatures.push({
//         name: feature,
//       });
//     }
//   }

//   const newHotelsFeatures = hotelsFeatures.map((feature) => ({
//     name: feature.name.trim(),
//   }));

//   return prisma.hotelFeature.createMany({
//     data: newHotelsFeatures,
//   });
// }

// async function loadHotelsFeaturesRelations() {
//   const hotelsFeatures = await prisma.hotelFeature.findMany();
//   const hotelsFeaturesRelations = [];

//   for (const hotel of hotels) {
//     for (const feature of hotel.features) {
//       const hotelFeature = hotelsFeatures.find(
//         (hotelFeature) => hotelFeature.name === feature.trim(),
//       );

//       if (!hotelFeature) {
//         continue;
//       }

//       hotelsFeaturesRelations.push({
//         hotelId: hotel._id.$oid,
//         featureId: hotelFeature.id,
//       });
//     }
//   }

//   return prisma.hotelFeatureItem.createMany({
//     data: hotelsFeaturesRelations,
//   });
// }

// async function loadUsers() {
//   const formattedUsers = users.map((user) => ({
//     id: user._id.$oid,
//     firstName: user.firstName,
//     lastName: user.lastName,
//     email: user.email,
//     password: user.password,
//     image: user.avatar,
//   }));

//   return prisma.user.createMany({
//     data: formattedUsers,
//   });
// }

// async function loadReviews() {
//   const reviews = [];

//   for (const hotel of hotels) {
//     for (const review of hotel.reviews) {
//       reviews.push({
//         id: review._id.$oid,
//         hotelId: hotel._id.$oid,
//         userId: review.user.$oid,
//         rating: review.rate,
//         content: review.body,
//         createdAt: new Date(+review.createdAt.$date.$numberLong),
//       });
//     }
//   }

//   return prisma.hotelReview.createMany({
//     data: reviews,
//   });
// }

// async function main() {
//   try {
//     // await loadCountries();
//     // await loadCities();
//     // await loadCitiesImages();
//     // await loadHotelsCategories();
//     // await loadHotels();
//     // await loadHotelsImages();
//     // await loadHotelsRooms();
//     // await loadHotelsFeatures();
//     // await loadHotelsFeaturesRelations();
//     // await loadUsers();
//     // await loadReviews();
//   } catch (e) {
//     console.error(e);
//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();

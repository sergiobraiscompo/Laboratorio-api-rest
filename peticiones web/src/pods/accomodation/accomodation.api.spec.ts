import { ObjectId } from 'mongodb';
import supertest from 'supertest';
import { createRestApiServer, dbServer } from '#core/servers/index.js';
import { ENV } from '#core/constants/index.js';
import { getAccomodationContext } from '#dals/accomodation/accomodation.context.js';
import { accomodationApi } from './accomodation.api.js';
import { describe, it, expect, beforeAll, afterAll, vi, beforeEach, afterEach } from 'vitest';
import { Accomodation } from '#dals/index.js';
import { request } from 'express';

const app = createRestApiServer();
app.use(accomodationApi);

const accomodationTestList: Accomodation[] = [
  {
    _id: new ObjectId("65097600a74000a4a4a22687"),
    name: "Horto flat with small garden",
    images: {
      "thumbnail_url": "",
      "medium_url": "",
      "picture_url": "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large",
      "xl_picture_url": ""
    },
    description: "One bedroom + sofa-bed in quiet and bucolic neighbourhood right next to the Botanical Garden. Small garden, outside shower, well equipped kitchen and bathroom with shower and tub. Easy for transport with many restaurants and basic facilities in the area. Lovely one bedroom + sofa-bed in the living room, perfect for two but fits up to four comfortably.  There´s a small outside garden with a shower There´s a well equipped open kitchen with both 110V / 220V wall plugs and one bathroom with shower, tub and even a sauna machine! All newly refurbished! I´ll be happy to help you with any doubts, tips or any other information needed during your stay. This charming ground floor flat is located in Horto, a quiet and bucolic neighborhood just next to the Botanical Garden, where most of the descendants of it´s first gardeners still live. You´ll be 30 minutes walk from waterfalls in the rainforest with easy hiking trails! There are nice bars and restaurants as well as basic facilities - pharmacy, b",
    address: {
      "street": "Rio de Janeiro, Rio de Janeiro, Brazil",
      "suburb": "Jardim Botânico",
      "government_area": "Jardim Botânico",
      "market": "Rio De Janeiro",
      "country": "Brazil",
      "country_code": "BR",
      "location": {
        "type": "Point",
        "coordinates": [
          -43.23074991429229,
          -22.966253551739655
        ],
        "is_location_exact": true
      }
    },
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    reviews: []
  },
  {
    _id: new ObjectId("65097600a74000a4a4a22688"),
    name: "Ocean View Waikiki Marina w/prkg",
    images: {
      "thumbnail_url": "",
      "medium_url": "",
      "picture_url": "https://a0.muscache.com/im/pictures/15037101/5aff14a7_original.jpg?aki_policy=large",
      "xl_picture_url": ""
    },
    description: "A short distance from Honolulu's billion dollar mall, and the same distance to Waikiki. Parking included. A great location that work perfectly for business, education, or simple visit. Experience Yacht Harbor views and 5 Star Hilton Hawaiian Village. Great studio located on Ala Moana across the street from Yacht Harbor and near Ala Moana Shopping Center. Studio kitchette, parking, wifi, TV, A/C. Amenities include pool, hot tub and tennis. Sweet ocean views with nice ocean breezes. Pool, hot tub and tennis We try our best at creating, simple responsive management which never bothers the guest. You can breath ocean as well as aloha. Honolulu does have a very good air conditioned bus system.",
    address: {
      "street": "Honolulu, HI, United States",
      "suburb": "Oʻahu",
      "government_area": "Primary Urban Center",
      "market": "Oahu",
      "country": "United States",
      "country_code": "US",
      "location": {
        "type": "Point",
        "coordinates": [
          -157.83919,
          21.28634
        ],
        "is_location_exact": true
      }
    },
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    reviews: [
      {
        _id: 409415200,
        date: new Date("2019-02-07T05:00:00.000Z"),
        listing_id: 1001265,
        reviewer_id: 65980899,
        reviewer_name: "Wendi",
        comments: "This is a great location in Honolulu!  You can walk to Waikiki in less than 10 minutes.  You are  on a high floor, and can see the water and the mountains.  It is a good value for this location!"
      },
      {
        _id: 407326158,
        date: new Date("2019-02-01T05:00:00.000Z"),
        listing_id: 1001265,
        reviewer_id: 191075155,
        reviewer_name: "Rhonda",
        comments: "Great Location!!  Beware of only one working elevator for a 32 story building.  Not sure when the elevator work is going to be completed.  I just used the inconvenience as an opportunity to get my cardio in going up/down 16 flights of stairs each day.  Enjoyed my stay.  Thanks David!"
      },
      {
        _id: 400059558,
        date: new Date("2019-01-10T05:00:00.000Z"),
        listing_id: 1001265,
        reviewer_id: 39615383,
        reviewer_name: "Robert",
        comments: "David was very helpful and accommodating!"
      },
      {
        _id: 363959231,
        date: new Date("2018-12-29T05:00:00.000Z"),
        listing_id: 1001265,
        reviewer_id: 13231063,
        reviewer_name: "Martina",
        comments: "Great location, very comfortable especially because of the parking space inside the building. Easy check in-check out procedure. We experienced a elevators failure during Christmas holidays, so no maintenance was available for few days. The apt is on the 16th floor so climbing the stairs (small ramps of 7 steps each though) at least twice a day was quite annoying. The host offered spontanusly 255€ refund for the inconvenience."
      },
      {
        _id: 359748878,
        date: new Date("2018-12-17T05:00:00.000Z"),
        listing_id: 1001265,
        reviewer_id: 117032728,
        reviewer_name: "Chaundra",
        comments: "Good value and central location"
      }
    ]
  },
  {
    _id: new ObjectId("65097600a74000a4a4a22689"),
    name: "Private Room in Bushwick",
    images: {
      "thumbnail_url": "",
      "medium_url": "",
      "picture_url": "https://a0.muscache.com/im/pictures/72844c8c-fec2-440e-a752-bba9b268c361.jpg?aki_policy=large",
      "xl_picture_url": ""
    },
    description: "Here exists a very cozy room for rent in a shared 4-bedroom apartment. It is located one block off of the JMZ at Myrtle Broadway.  The neighborhood is diverse and appeals to a variety of people.",
    address: {
      "street": "Brooklyn, NY, United States",
      "suburb": "Brooklyn",
      "government_area": "Bushwick",
      "market": "New York",
      "country": "United States",
      "country_code": "US",
      "location": {
        "type": "Point",
        "coordinates": [
          -73.93615,
          40.69791
        ],
        "is_location_exact": true
      }
    },
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    reviews: [
      {
        _id: 61050713,
        date: new Date("2016-01-31T05:00:00.000Z"),
        listing_id: 10021707,
        reviewer_id: 52006105,
        reviewer_name: "Antoine",
        comments: "Josh was out of town during my 1 month stay. His roommates greeted and helped get me settled. They were great hosts and all around cool people. I'm a Brooklynite, but have never lived in Bushwick.\r\nIf you're looking for an hip, authentic, and convenient Brooklyn experience, this spot is for you.  You can literally see the Subway platform from Josh's window. Also a couple steps away from anything you could possibly need... restaurants, juice bar, organic grocery, etc. "
      }
    ]
  },
  {
    _id: new ObjectId("65097600a74000a4a4a2268a"),
    name: "Apt Linda Vista Lagoa - Rio",
    images: {
      "thumbnail_url": "",
      "medium_url": "",
      "picture_url": "https://a0.muscache.com/im/pictures/59c516bd-c7c3-4dae-8625-aff5f55ece53.jpg?aki_policy=large",
      "xl_picture_url": ""
    },
    description: "Quarto com vista para a Lagoa Rodrigo de Freitas, cartão postal do Rio de Janeiro. Linda Vista.  1 Quarto e 1 banheiro  Amplo, arejado, vaga na garagem. Prédio com piscina, sauna e playground.  Fácil acesso, próximo da praia e shoppings.",
    address: {
      "street": "Rio de Janeiro, Rio de Janeiro, Brazil",
      "suburb": "Lagoa",
      "government_area": "Lagoa",
      "market": "Rio De Janeiro",
      "country": "Brazil",
      "country_code": "BR",
      "location": {
        "type": "Point",
        "coordinates": [
          -43.205047082633435,
          -22.971950988341874
        ],
        "is_location_exact": true
      }
    },
    bedrooms: 1,
    beds: 1,
    bathrooms: 2,
    reviews: []
  },
  {
    _id: new ObjectId("65097600a74000a4a4a22686"),
    name: "Ribeira Charming Duplex",
    images: {
      "thumbnail_url": "",
      "medium_url": "",
      "picture_url": "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",
      "xl_picture_url": ""
    },
    description: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube) - UNESCO World Heritage Site. Centenary building fully rehabilitated, without losing their original character. Privileged views of the Douro River and Ribeira square, our apartment offers the perfect conditions to discover the history and the charm of Porto. Apartment comfortable, charming, romantic and cozy in the heart of Ribeira. Within walking distance of all the most emblematic places of the city of Porto. The apartment is fully equipped to host 8 people, with cooker, oven, washing machine, dishwasher, microwave, coffee machine (Nespresso) and kettle. The apartment is located in a very typical area of the city that allows to cross with the most picturesque population of the city, welcoming, genuine and happy people that fills the streets with his outspoken speech and contagious with your sincere generosity, wrapped in a only parochial spirit. We are always available to help guests",
    address: {
      "street": "Porto, Porto, Portugal",
      "suburb": "",
      "government_area": "Cedofeita, Ildefonso, Sé, Miragaia, Nicolau, Vitória",
      "market": "Porto",
      "country": "Portugal",
      "country_code": "PT",
      "location": {
        "type": "Point",
        "coordinates": [
          -8.61308,
          41.1413
        ],
        "is_location_exact": false
      }
    },
    bedrooms: 3,
    beds: 5,
    bathrooms: 1,
    "reviews": [
      {
        _id: 403055315,
        date: new Date("2019-01-20T05:00:00.000Z"),
        listing_id: 10006546,
        reviewer_id: 15138940,
        reviewer_name: "Milo",
        comments: "The house was extremely well located and Ana was able to give us some really great tips on locations to have lunch and eat out. The house was perfectly clean and the easily able to accommodate 6 people despite only having one bathroom. The beds and living room were comfortable. \n\nHowever, we always felt somewhat on edge in the house due to the number of signs posted around the kitchen, bedrooms and bathroom about being charged 15€ for all sorts of extras like not washing up or using extra towels and bed linen. Not that this would be particularly unreasonable but it made us feel like we were walking on egg shells in and around the house. \n\nThe hosts were aware that we were a group of six yet one of the beds was not prepared and we ran out of toilet paper well before we were due to check out despite only being there 2 nights. It really wasn't the end of the world but the shower head does not have a wall fitting meaning you had to hold it yourself if you wanted to stand underneath it."
      },
      {
        _id: 364728730,
        date: new Date("2018-12-31T05:00:00.000Z"),
        listing_id: 10006546,
        reviewer_id: 91827533,
        reviewer_name: "Mr",
        comments: "Ana & Goncalo were great on communication, responding instantly to questions.\n5 of us stayed in their home for 3 nights and found the location to be great and central to all the amazing sights Porto has to offer. \nWe found the home to be difficult to heat on our first night, the rooms have heaters but took time to get the room to a comfortable temperature level. But in warmer months Im sure this isn't an issue.\nThe beds are a little hard with one slightly out of shape,  and the shower is fairly basic (hand held) but does the job. Because of the central location some noise can be expected early in the mornings. \nOverall the apartment suited our needs for our short stay and the price is more than reasonable for what we got."
      },
      {
        _id: 362865132,
        date: new Date("2018-12-27T05:00:00.000Z"),
        listing_id: 10006546,
        reviewer_id: 208880077,
        reviewer_name: "Thomas",
        comments: "Very helpful hosts. Cooked traditional Portuguese Christmas dinner for 6. Location is perfect. Right off square that is on river right by famous bridge engineered by protege of Gustav Eifel. Looks like same type structure."
      }
    ]
  },
]

describe('pods/accomodation/accomodation.api specs', () => {
  beforeAll(async () => {
    await dbServer.connect(ENV.MONGODB_URL);
  });

  beforeEach(async () => {
    await getAccomodationContext().insertMany(accomodationTestList);
  });

  afterEach(async () => {
    await getAccomodationContext().deleteMany({});
  });

  afterAll(async () => {
    await dbServer.disconnect();
  });

  // get tests
  describe('get accomodation list', () => {
    it('should return the whole accomodation list with values when it request "/" endpoint without query params', async () => {
      // Arrange
      const route = '/';

      // Act
      const response = await supertest(app).get(route);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveLength(5)
    });
  });

  describe('get accomodation', () => {
    it('should return an accomodation when we specify its id', async () => {
      // Arrange
      const route = '/65097600a74000a4a4a22687';
      const expectedResult = {
        id: "65097600a74000a4a4a22687",
        name: "Horto flat with small garden",
        images: {
          "thumbnail_url": "",
          "medium_url": "",
          "picture_url": "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large",
          "xl_picture_url": ""
        },
        description: "One bedroom + sofa-bed in quiet and bucolic neighbourhood right next to the Botanical Garden. Small garden, outside shower, well equipped kitchen and bathroom with shower and tub. Easy for transport with many restaurants and basic facilities in the area. Lovely one bedroom + sofa-bed in the living room, perfect for two but fits up to four comfortably.  There´s a small outside garden with a shower There´s a well equipped open kitchen with both 110V / 220V wall plugs and one bathroom with shower, tub and even a sauna machine! All newly refurbished! I´ll be happy to help you with any doubts, tips or any other information needed during your stay. This charming ground floor flat is located in Horto, a quiet and bucolic neighborhood just next to the Botanical Garden, where most of the descendants of it´s first gardeners still live. You´ll be 30 minutes walk from waterfalls in the rainforest with easy hiking trails! There are nice bars and restaurants as well as basic facilities - pharmacy, b",
        address: {
          "street": "Rio de Janeiro, Rio de Janeiro, Brazil",
          "suburb": "Jardim Botânico",
          "government_area": "Jardim Botânico",
          "market": "Rio De Janeiro",
          "country": "Brazil",
          "country_code": "BR",
          "location": {
            "type": "Point",
            "coordinates": [
              -43.23074991429229,
              -22.966253551739655
            ],
            "is_location_exact": true
          }
        },
        bedrooms: 1,
        beds: 2,
        bathrooms: 1,
        reviews: []
      }

      // Act
      const response = await supertest(app).get(route);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body).toStrictEqual(expectedResult);
    });
  });

  // put tests
  describe('inserts a review on the specified accomdation', () => {
    it('should return 201 when review is inserted', async () => {
      // Arrange
      const route = '/65097600a74000a4a4a22687';
      const newReview = {
        "listing_id": "10006546",
        "reviewer_id": "000000000",
        "reviewer_name": "notocold",
        "comments": "Lorem ipsum dolor amet."
      };
      request.body = newReview
      
      // Act
      const response = await supertest(app).put(route).send(newReview);
      console.log(request.body);

      // Assert
      expect(response.statusCode).toEqual(201);
      expect(response.body.id).toEqual(expect.any(String));
      expect(response.body._id).toBe(Number);
      expect(response.body.date).toBe(Date);
      expect(response.body.listing_id).toEqual(newReview.listing_id);
      expect(response.body.reviewer_id).toEqual(newReview.reviewer_id);
      expect(response.body.reviewer_name).toEqual(newReview.reviewer_name);
      expect(response.body.comments).toEqual(newReview.comments);
    });
  });
});

// describe('pods/accomodation/accomodation.api specs', () => {
// beforeAll(async () => {
//   await dbServer.connect(ENV.MONGODB_URL);
// });

// beforeEach(async () => {
//   await getAccomodationContext().insertOne({
//     _id:newObjectId(),
//     title: 'book-1',
//     author: 'author-1',
//     releaseDate: new Date('2021-07-28'),
//   });
// });

// afterEach(async () => {
//   await getAccomodationContext().deleteMany({});
// });

// afterAll(async () => {
//   await dbServer.disconnect();
// });

//   describe('get accomodation list', () => {
//     it('should return the whole accomodationList with values when it request "/" endpoint without query params', async () => {
//       // Arrange
//       const route = '/';

//       // Act
//       const response = await supertest(app).get(route);

//       // Assert
//       expect(response.statusCode).toEqual(200);
//     expect(response.body).toHaveLength(1);
//     });
//   });
// });


//   describe('get book list', () => {

//     it('should return the whole bookList with values when it request "/" endpoint without query params', async () => {
//       ...
//     });
//   });

// + describe('insert book', () => {
// +   it('should return 201 when an admin user inserts new book', async () => {
// +     // Arrange
// +     const app = createRestApiServer();
// +     app.use((req, res, next) => {
// +       req.userSession = {
// +         id: '1',
// +         role: 'admin',
// +       };
// +       next();
// +     });
// +     app.use(bookApi);

// +     const route = '/';
// +     const newReview: Book = {
// +       id: undefined,
// +       title: 'book-2',
// +       author: 'author-2',
// +       releaseDate: '2021-07-29T00:00:00.000Z',
// +     };

// +     // Act
// +     const response = await supertest(app).post(route).send(newReview);

// +     // Assert
// +     expect(response.statusCode).toEqual(201);
// +     expect(response.body.id).toEqual(expect.any(String));
// +     expect(response.body.title).toEqual(newReview.title);
// +     expect(response.body.author).toEqual(newReview.author);
// +     expect(response.body.releaseDate).toEqual(newReview.releaseDate);
// +   });
// + });


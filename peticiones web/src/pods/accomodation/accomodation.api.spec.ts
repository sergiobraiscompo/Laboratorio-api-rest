import { ObjectId } from 'mongodb';
import supertest from 'supertest';
import { createRestApiServer, dbServer } from '#core/servers/index.js';
import { ENV } from '#core/constants/index.js';
import { getAccomodationContext } from '#dals/accomodation/accomodation.context.js';
import { accomodationApi } from './accomodation.api.js';
import { Accomodation } from './accomodation.api-model.js';
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { mapReviewsFromApiToModel } from './accomodation.mappers.js';

const app = createRestApiServer();
app.use(accomodationApi);

describe('pods/accomodation/accomodation.api specs', () => {
  beforeAll(async () => {
    await dbServer.connect(ENV.MONGODB_URL);
  });

  afterAll(async () => {
    await dbServer.disconnect();
  });

  describe('get accomodation list', () => {
    const app = createRestApiServer();
    app.use(accomodationApi);

    it('should return the whole accomodation list with values when it request "/" endpoint without query params', async () => {
      // Arrange
      const route = '/';

      // Act
      const response = await supertest(app).get(route);

      // Assert
      expect(response.statusCode).toEqual(200);
    });
  });
  describe('get paginated accomodation list', () => {
    const app = createRestApiServer();
    app.use(accomodationApi);

    it('should return the accomodation list paginated as indicated', async () => {
      // Arrange
      const route = '/';

      // Act
      const response = await supertest(app).get(route);
      
      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveLength(5);
    });
  });
});


// describe('pods/accomodation/accomodation.api specs', () => {
// beforeAll(async () => {
//   await dbServer.connect(ENV.MONGODB_URL);
// });

// beforeEach(async () => {
//   await getAccomodationContext().insertOne({
//     _id: new ObjectId(),
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
// +     const newBook: Book = {
// +       id: undefined,
// +       title: 'book-2',
// +       author: 'author-2',
// +       releaseDate: '2021-07-29T00:00:00.000Z',
// +     };

// +     // Act
// +     const response = await supertest(app).post(route).send(newBook);

// +     // Assert
// +     expect(response.statusCode).toEqual(201);
// +     expect(response.body.id).toEqual(expect.any(String));
// +     expect(response.body.title).toEqual(newBook.title);
// +     expect(response.body.author).toEqual(newBook.author);
// +     expect(response.body.releaseDate).toEqual(newBook.releaseDate);
// +   });
// + });


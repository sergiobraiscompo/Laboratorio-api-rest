import { ObjectId } from 'mongodb';
import supertest from 'supertest';
import { createRestApiServer, dbServer } from '#core/servers/index.js';
import { ENV } from '#core/constants/index.js';
import { getAccomodationContext } from '#dals/accomodation/accomodation.context.js';
import { accomodationApi } from './accomodation.api.js';
import { application } from 'express';
import { Accomodation } from './accomodation.api-model.js';

describe('pods/accomodation/accomodation.api specs', () => {
    beforeAll(async () => {
        await dbServer.connect(ENV.MONGODB_URL);
    });

    beforeEach(async () => {
        await getAccomodationContext().insertOne({
            _id: new ObjectId(),
            name: "Nice room in Barcelona Center",
            description: "Hi!  Cozy double bed room in amazing flat next to Passeig de Sant Joan and to metro stop Verdaguer. 3 streets to Sagrada Familia and 4 streets to Passeig de Gracia. Flat located in the center of the city.  View to Sagrada Familia and Torre Agbar. Nice flat in the central neighboorhood of Eixample. Ideal couple or 2 friends. Dreta de l'Eixample",
            bedrooms: 1,
            beds: 2,
            bathrooms: 1,
            reviews: [{
                _id: new ObjectId(),
                date: new Date(),
                reviewerName: "",
                comment: ""
            }],
            images: "https://a0.muscache.com/im/pictures/aed1923a-69a6-4614-99d0-fd5c8f41ebda.jpg?aki_policy=large",
            address: "Barcelona"
        });
    });

    afterEach(async () => {
        await getAccomodationContext().deleteMany({});
    });

    afterAll(async () => {
        await dbServer.disconnect();
    });

    describe('get accomodation list', () => {
        it('should return the whole accomodationList with values when it request "/" endpoint without query params', async () => {
            // Arrange
            const route = '/';

            // Act
            const response = await supertest(application).get(route);

            // Assert
            expect(response.statusCode).toEqual(200);
            expect(response.body).toHaveLength(1);
        });
    });
});

describe('insert accomodation', () => {
    it('should return 201 when an admin user inserts new accomodation', async () => {
        // Arrange
        const app = createRestApiServer();
        app.use((req, res, next) => {
            req.userSession = {
                id: '1',
                role: 'admin',
            };
            next();
        });
        app.use(accomodationApi);

        const route = '/';
        const newAccomodation: Accomodation = {
            id: undefined,
            title: 'book-2',
            author: 'author-2',
            releaseDate: '2021-07-29T00:00:00.000Z',
        };

        // Act
        const response = await supertest(app).post(route).send(newAccomodation);

        // Assert
        expect(response.statusCode).toEqual(201);
        expect(response.body.id).toEqual(expect.any(String));
        expect(response.body.title).toEqual(newAccomodation);
        expect(response.body.author).toEqual(newAccomodation.author);
        expect(response.body.releaseDate).toEqual(newAccomodation.releaseDate);
    });
});

it('should return 403 when a standard user try to insert new book', async () => {
    // Arrange
    const app = createRestApiServer();
    app.use((req, res, next) => {
        req.userSession = {
            id: '1',
            role: 'standard-user',
        };
        next();
    });
    app.use(accomodationApi);

    const route = '/';
    const newAccomodation: Accomodation = {
        id: undefined,
        title: 'book-2',
        author: 'author-2',
        releaseDate: '2021-07-29T00:00:00.000Z',
    };

    // Act
    const response = await supertest(app).post(route).send(newAccomodation);

    // Assert
    expect(response.statusCode).toEqual(403);
});
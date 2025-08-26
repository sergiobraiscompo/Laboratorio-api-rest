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
            title: 'accomodation-1',
            author: 'author-1',
            releaseDate: new Date('2021-07-28'),
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
        expect(response.body.title).toEqual(newAccomodation.title);
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
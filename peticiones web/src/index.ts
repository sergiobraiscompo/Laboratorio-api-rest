import express, { application } from 'express';
import path from 'path';
import url from 'url';
import {
  logRequestMiddleware,
  logErrorRequestMiddleware,
} from '#common/middlewares/index.js';
import { createRestApiServer, dbServer } from '#core/servers/index.js';
import { ENV } from '#core/constants/index.js';
import { accomodationApi } from '#pods/accomodation/index.js';

const app = createRestApiServer();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const staticFilesPath = path.resolve(__dirname, ENV.STATIC_FILES_PATH);
app.use('/', express.static(staticFilesPath));

// app.use(
//   '/',
//   express.static(path.resolve(import.meta.dirname, ENV.STATIC_FILES_PATH))
// );

app.use(logRequestMiddleware);

app.use('/api/airbnb-db', accomodationApi);

app.use(logErrorRequestMiddleware);

app.listen(ENV.PORT, async () => {
  if (!ENV.IS_API_MOCK) {
    await dbServer.connect(ENV.MONGODB_URL);
    console.log('Running DataBase');
  } else {
    console.log('Running Mock API');
  }
  console.log(`Server ready at port ${ENV.PORT}`);
});

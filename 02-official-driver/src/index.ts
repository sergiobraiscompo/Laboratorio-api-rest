import express from 'express';
import path from 'path';
import url from 'url';
import {
  logRequestMiddleware,
  logErrorRequestMiddleware,
} from '#common/middlewares/index.js';
import { createRestApiServer, connectToDBServer } from '#core/servers/index.js';
import { ENV } from '#core/constants/index.js';
import { accomodationApi } from '#pods/accomodation/index.js';

const restApiServer = createRestApiServer();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const staticFilesPath = path.resolve(__dirname, ENV.STATIC_FILES_PATH);
restApiServer.use('/', express.static(staticFilesPath));

restApiServer.use(logRequestMiddleware);

restApiServer.use('/api/airbnb-db', accomodationApi);

restApiServer.use(logErrorRequestMiddleware);

restApiServer.listen(ENV.PORT, async () => {
  if (!ENV.IS_API_MOCK) {
    await connectToDBServer(ENV.MONGODB_URL);
    console.log('Connected to DB');
  } else {
    console.log('Running API mock');
  }
  console.log(`Server ready at port ${ENV.PORT}`);
});

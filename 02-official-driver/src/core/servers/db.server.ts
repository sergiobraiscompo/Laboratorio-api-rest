import { connect } from "mongoose";

export const connectToDBServer = async (connectionURI: string) => {
  await connect(connectionURI);
};

// interface DBServer {
//   connect: (connectionURL: string) => Promise<void>;
//   db: Db;
// }

// export let dbServer: DBServer = {
//   connect,
//   db: undefined,
// };

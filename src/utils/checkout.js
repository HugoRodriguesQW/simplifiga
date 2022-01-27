import { v4 as uuidv4 } from "uuid";
import { Database } from "../pages/api/database";

export async function generateUUID({ tries }) {
  const db = new Database();
  await db.connect();

  let currentTry = 0;
  return new Promise((resolve, reject) => {
    function gen() {
      currentTry++;
      const orderId = uuidv4();
      db.searchOrderIdInDatabase({ orderId }).then(
        () => {
          resolve(orderId);
        },
        () => {
          if (tries && currentTry > tries) reject();
          gen();
        }
      );
    }

    gen();
  });
}

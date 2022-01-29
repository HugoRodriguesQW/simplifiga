import { MongoClient } from "mongodb";
import { generateUUID } from "../../utils/checkout";

let cachedDb = null;
let cachedCl = null;

const node = process.env.NODE_ENV ? process.env.NODE_ENV + "-" : null;

export class Database {
  constructor() {
    this.db = cachedDb;
    this.cl = cachedCl;
  }

  async connect() {
    const secret = process.env.MONGO_URI;

    if (this.db && this.cl) {
      return this;
    }

    cachedCl = await MongoClient.connect(secret, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = cachedCl.db("simplifiga");

    this.db = cachedDb;
    this.cl = cachedCl;
    return this;
  }

  async validate({ token }) {
    const isValid =
      (await this.db
        ?.collection(`${node}clients`)
        ?.findOne({ token: token })) != null;
    return isValid;
  }

  async addClient(data) {
    const res = await this.db?.collection(`${node}clients`)?.insertOne(data);
    return res;
  }

  async login({ email, password }) {
    const user = await this.db
      ?.collection(`${node}clients`)
      ?.findOne({ email: email, password: password });
    return user;
  }

  async createCode({ email }) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const date = new Date();

    date.setMinutes(date.getMinutes() + 10);

    await this.db
      .collection("reset")
      .createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
    const res = await this.db.collection("reset").insertOne({
      expireAt: date,
      logEvent: 1,
      logMessage: "Success!",
      email: email,
      code: code,
    });
    return res.acknowledged ? code : null;
  }

  async validateCode({ code, email }) {
    const isValid =
      (await this.db
        ?.collection("reset")
        ?.findOne({ email: email, code: code })) != null;
    return isValid;
  }

  async deleteCode({ code, email }) {
    const res = await this.db.collection("reset").deleteOne({ code, email });
    return res;
  }

  async updateUserData({ data, filter }) {
    const res = await this.db
      .collection(`${node}clients`)
      .updateOne({ ...filter }, { $set: { ...data } });
    return res.modifiedCount === 1;
  }

  async find({ collection, key, data }) {
    const has = await this.db
      ?.collection(`${node}${collection}`)
      ?.findOne({ [key]: data });
    return has ?? null;
  }

  async addClick(id) {
    const res = await this.db
      ?.collection(`${node}links`)
      ?.updateOne({ id: id }, { $inc: { clicks: 1 } });
    return res;
  }

  async updateLocation(local, id) {
    // {country, code, region}
    try {
      if (!id) return;
      const doc = await this.db?.collection(`${node}links`)?.findOne({ id });
      const locExist =
        doc.locations.filter(({ country, regions }) => {
          const regExist =
            regions.filter(({ name }) => {
              return name === local.region;
            })[0] != null;

          return local.country === country && regExist;
        })[0] != null;

      if (!locExist) {
        return await this.db?.collection(`${node}links`)?.updateOne(
          { id },
          {
            $push: {
              locations: {
                country: local.country,
                code: local.code,
                regions: [{ name: local.region, clicks: 1 }],
              },
            },
          }
        );
      }
      return await this.db?.collection(`${node}links`)?.updateOne(
        {
          id,
          "locations.country": local.country,
          "locations.code": local.code,
        },
        { $inc: { "locations.$[].regions.$[region].clicks": 1 } },
        {
          arrayFilters: [
            {
              "region.name": local.region,
            },
          ],
        }
      );
    } catch (err) {
      return console.info("Ocorreu um erro:", err);
    }
  }

  async updateReferrer(referer, id) {
    try {
      if (!id) return;
      const doc = await this.db?.collection(`${node}links`).findOne({ id });
      const refExist =
        doc.references.filter(({ ref }) => {
          return ref === referer;
        })[0] != null;

      if (!refExist) {
        return await this.db?.collection(`${node}links`)?.updateOne(
          { id },
          {
            $push: {
              references: { ref: referer, clicks: 1 },
            },
          }
        );
      }

      return await this.db
        ?.collection(`${node}links`)
        .updateOne(
          { id, "references.ref": referer },
          { $inc: { "references.$.clicks": 1 } }
        );
    } catch (err) {
      return console.info("Um erro ocorreu:", err);
    }
  }

  async getOrCreateAnOrderID({ token }) {
    const client = await this.db
      ?.collection(`${node}clients`)
      .findOne({ token });
    let orderId = client.orderId ?? null;

    if (!orderId) {
      await generateUUID({ tries: 10 }).then((validId) =>
        this.db
          ?.collection(`${node}clients`)
          .updateOne({ token }, { $set: { orderId: validId } })
          .then(() => (orderId = validId))
      );
    }

    return orderId ?? null;
  }

  searchOrderIdInDatabase({ orderId }) {
    return new Promise((resolve, reject) => {
      this.db
        ?.collection(`${node}clients`)
        .findOne({ orderId })
        .then((obj) => {
          if (!obj) return resolve(orderId);
          reject("[LOW] OrderId not found");
        }, reject);
    });
  }

  receivePaymentStatus({ captureId }) {
    return new Promise((resolve, reject) => {
      this.db
        ?.collection(`${node}payments`)
        .findOne({ captureId })
        .then((payment) => {
          if (payment) return resolve(payment);
          reject("[LOW] Payment not found");
        }, reject);
    });
  }

  createNewPaymentStatus({ captureId, status }) {
    return new Promise((resolve, reject) => {
      this.db
        ?.collection(`${node}payments`)
        .insertOne({ captureId, status })
        .then(({ insertedId, acknowledged }) => {
          if (acknowledged) return resolve(insertedId);
          reject("[HIGH] Payment not created");
        }, reject);
    });
  }

  changePaymentStatus({ captureId, status }) {
    return new Promise((resolve, reject) => {
      this.db
        ?.collection(`${node}payments`)
        .updateOne(
          { captureId },
          {
            $set: {
              status,
            },
          }
        )
        .then(({ applied, acknowledged }) => {
          if (applied) return resolve(acknowledged);
          reject("[LOW] Pay Update not applied.");
        }, reject);
    });
  }

  setOrderReference({ orderRef, orderId, payer }) {
    return new Promise((resolve, reject) => {
      this.db
        ?.collection(`${node}clients`)
        .updateOne(
          { orderId },
          {
            $set: {
              orderRef,
              payer,
            },
          }
        )
        .then(({ applied, acknowledged }) => {
          if (applied) return resolve(acknowledged);
          reject("[LOW] Order reference not updated.");
        }, reject);
    });
  }

  getPaymentStatus({ orderId }) {
    return new Promise((resolve, reject) => {
      this.db
        ?.collection(`${node}clients`)
        .findOne({ orderId })
        .then(
          (data) => {
            if (!data?.orderRef) return reject("order-not-found");
            this.db
              ?.collection(`${node}payments`)
              .findOne({
                captureId: data.orderRef,
              })
              .then((payment) => {
                if (!payment) return reject("payment-not-found");
                resolve({
                  captureId: payment.captureId,
                  status: payment.status,
                });
              });
          },
          () => {
            reject("other-error");
          }
        );
    });
  }

  clearOrderField({ orderId }) {
    return new Promise((resolve, reject) => {
      console.info("Cleaning:", orderId);
      this.db
        ?.collection(`${node}clients`)
        .findOne({ orderId })
        .then(
          (data) => {
            if (!data?.orderRef) return reject("order-ref-not-found");

            this.db
              ?.collection(`${node}clients`)
              .updateOne(
                { orderId },
                {
                  $unset: {
                    orderRef: "",
                  },
                  $push: {
                    oldOrdersRef: data.orderRef,
                  },
                }
              )
              .then(
                ({ acknowledged }) => {
                  if (!acknowledged) return reject("update-error");
                  resolve({ acknowledged });
                },
                () => reject("update-ref-reject")
              );
          },
          () => reject("order-ref-reject")
        );
    });
  }
}

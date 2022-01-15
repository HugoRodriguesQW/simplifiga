import { MongoClient } from "mongodb";

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

  async getLink({ id }) {
    if (!id) return null;
    const query = { id: id };
    const res = await this.db?.collection(`${node}links`)?.findOne(query);
    return {
      target: res?.target ?? null,
      origin: res?.origin ?? null,
    };
  }

  async allWithParameter({ name, data, collection }) {
    const res = await this.db?.collection(collection).find({ [name]: data });
    if (res) return res.toArray();
    return null;
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
    const has = await this.db?.collection(collection)?.findOne({ [key]: data });
    return has ?? null;
  }

  async addClick(id) {
    const res = await this.db
      ?.collection(`${node}links`)
      ?.updateOne({ id: id }, { $inc: { clicks: 1 } });
    return res;
  }

  async updateLocation(local, origin) {
    // {country, code, region}
    try {
      if (!origin) return;
      const user = await this.db
        ?.collection(`${node}clients`)
        ?.findOne({ token: origin });
      const locExist =
        user.locations.filter(({ country, regions }) => {
          const regExist =
            regions.filter(({ name }) => {
              return name === local.region;
            })[0] != null;

          return local.country === country && regExist;
        })[0] != null;

      if (!locExist) {
        return await this.db?.collection(`${node}clients`)?.updateOne(
          { token: origin },
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
      return await this.db?.collection(`${node}clients`)?.updateOne(
        {
          token: origin,
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

  async updateReferrer(referer, origin) {
    try {
      if (!origin) return;
      const user = await this.db
        ?.collection(`${node}clients`)
        .findOne({ token: origin });
      const refExist =
        user.references.filter(({ ref }) => {
          return ref === referer;
        })[0] != null;

      if (!refExist) {
        return await this.db?.collection(`${node}clients`)?.updateOne(
          { token: origin },
          {
            $push: {
              references: { ref: referer, clicks: 1 },
            },
          }
        );
      }

      return await this.db
        ?.collection(`${node}clients`)
        .updateOne(
          { token: origin, "references.ref": referer },
          { $inc: { "references.$.clicks": 1 } }
        );
    } catch (err) {
      return console.info("Um erro ocorreu:", err);
    }
  }
}

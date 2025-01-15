// MySQL is an example of a relational database - you would use an ORM to translate between your objects in code and the relational representation of the data.
// Examples of ORMs are nHibernate, Entity Framework, Dapper and more...

// MongoDB is an example of a document database - you would use an ODM to translate between your objects in code and the document representation of the data (if needed). mongoose,prisma
 
import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";

export default async function conectDb() {
  try {
    await mongoose.connect(DB_URL);
    console.log("connected to mangoDB");
  } catch (error) {
    console.log("something went Wrong", error);
  }
}

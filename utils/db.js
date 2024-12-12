import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.db = this.client.db(database);
    }).catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
    });
  }

  /**
   * Check if the MongoDB client is alive
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Get the number of users in the database
   * @returns {Promise<number>}
   */
  async nbUsers() {
    try {
      return await this.db.collection('users').countDocuments();
    } catch (err) {
      console.error('Failed to count users:', err);
      return 0;
    }
  }

  /**
   * Get the number of files in the database
   * @returns {Promise<number>}
   */
  async nbFiles() {
    try {
      return await this.db.collection('files').countDocuments();
    } catch (err) {
      console.error('Failed to count files:', err);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
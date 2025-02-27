import database from "./database.js";

// User model functions (using async/await for cleaner code)
const Member = {
  create: async (memberData) => {
    try {
      // 1. 取得 memberData 的鍵和值
      const keys = Object.keys(memberData);
      const values = Object.values(memberData);

      // 2. 建立 INSERT 語句 (使用 ? 佔位符)
      const placeholders = keys.map(() => "?").join(", ");
      const sql = `INSERT INTO member (${keys.join(
        ", "
      )}) VALUES (${placeholders})`;

      // 3. 執行查詢
      const [result] = await database.execute(sql, values);

      return result.insertId; // Return the inserted ID
    } catch (error) {
      console.error("Error creating member:", error);
      throw error; // Re-throw the error for handling in the calling function
    }
  },

  findById: async (id) => {
    try {
      const [rows] = await database.execute(
        "SELECT * FROM member WHERE id = ?",
        [id]
      );
      return rows[0]; // Return the first user found (or undefined if not found)
    } catch (error) {
      console.error("Error finding member by ID:", error);
      throw error;
    }
  },

  findByUsername: async (username) => {
    try {
      const [rows] = await database.execute(
        "SELECT * FROM member WHERE username = ?",
        [username]
      );
      return rows[0];
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  },

  // Add other methods as needed (e.g., findByName, update, delete)
  // ... (similar structure to findById/findByEmail)
};

export default Member; // Export the User object with its methods

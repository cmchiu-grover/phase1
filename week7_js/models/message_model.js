import database from "./database.js";

const Message = {
  create: async (messageContent) => {
    try {
      const keys = Object.keys(messageContent);
      const values = Object.values(messageContent);

      const placeholders = keys.map(() => "?").join(", ");
      const sql = `INSERT INTO message (${keys.join(
        ", "
      )}) VALUES (${placeholders})`;

      const [result] = await database.execute(sql, values);

      return result.insertId;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const [rows] = await database.execute(
        "SELECT * FROM message WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error finding message by ID:", error);
      throw error;
    }
  },
  findAll: async () => {
    try {
      const sql = `
            SELECT message.*, member.name, member.username
            FROM message
            LEFT JOIN member ON message.member_id = member.id
            ORDER BY message.time DESC;
        `;
      const [rows] = await database.execute(sql);
      return rows;
    } catch (error) {
      console.error("Error finding all messages with user info:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const [result] = await database.execute(
        "DELETE FROM message WHERE id = ?",
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error deleting message:", error);
      throw error;
    }
  },
};

export default Message;

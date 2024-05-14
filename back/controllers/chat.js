const connection = require("../connect");

class ChatController {
    async getExistedChats(req, res) {
        const { user_id } = req.body;
        try {
            const chatsResult = await connection.query(
                `SELECT chats.id, chats.created_at, chats.updated_at FROM chats
            JOIN chat_user cu ON chats.id = cu.chat_id
            WHERE cu.user_id = $1`,
                [user_id]
            );

            const chats = await Promise.all(chatsResult.rows.map(async (chat) => {
                const usersResult = await connection.query(
                    `SELECT cu.user_id FROM chat_user cu WHERE cu.chat_id = $1 AND cu.user_id != $2`,
                    [chat.id, user_id]  // Исключаем себя из списка пользователей чата
                );

                const users = await Promise.all(usersResult.rows.map(async (user) => {
                    const userDetails = await connection.query(
                        `SELECT u.id, u.name, u.surname, u.patronymic, u.img FROM users u WHERE u.id = $1`,
                        [user.user_id]
                    );
                    return userDetails.rows[0];
                }));
                const user = users[0];
                return {
                    ...chat,
                    user
                };
            }));
            res.status(200).send({chats});
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }


    async getUsersForNewChat(req, res) {
        const {user_id} = req.body;
        try {
            const query = `SELECT u.id, u.name, u.surname, u.patronymic, u.role
            FROM users u
            WHERE u.id != $1
            AND NOT EXISTS (
                SELECT 1 FROM chat_user cu
                INNER JOIN chats c ON cu.chat_id = c.id
                WHERE (cu.user_id = u.id AND cu.chat_id IN (
                    SELECT cu.chat_id FROM chat_user cu WHERE cu.user_id = $1
                ))
            )
            ORDER BY u.role`
            const result = await connection.query(query, [user_id]);
            res.status(200).send({users: result.rows});
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    async createChat(req, res) {
        const {my_id, another_user_id} = req.body;
        try {
            const dateCreation = new Date().toISOString();
            const chatResult = await connection.query('INSERT INTO chats (created_at) VALUES ($1) RETURNING id', [dateCreation]);
            const chatId = chatResult.rows[0].id;

            const connectionForMe = connection.query('INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2)', [chatId, my_id])
            const connectionForAnother = connection.query('INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2)', [chatId, another_user_id])

            res.status(200).send({isSuccess: true});
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    async getChatMessages(req, res) {
        const {chat_id, user_id} = req.body;
        try {
            const result = await connection.query('SELECT * FROM chat_user WHERE chat_id = $1', [chat_id]);
            const usersInChat = result.rows;

            const userExists = usersInChat.some(user => user.user_id === user_id);

            if (!userExists) {
                return res.status(401).json({message: 'Доступ запрещён'});
            }

            const chatResult = await connection.query('SELECT * FROM messages WHERE chat_id = $1 ORDER BY id', [chat_id]);

            const messages = await Promise.all(chatResult.rows.map(async (chat) => {
                const userResult = await connection.query(
                    `SELECT us.img, us.name, us.surname, us.patronymic FROM users us WHERE us.id = $1`,
                    [chat.user_id]
                );
                const user = userResult.rows[0];
                return {
                    ...chat,
                    user
                }
            }))
            res.status(200).send({messages: messages});
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    async sendMessage(req, res) {
        const {chat_id, user_id, text} = req.body;
        try {
            const dateCreation = new Date().toISOString();
            const chatResult = await connection.query('INSERT INTO messages (chat_id, user_id, text, created_at) VALUES ($1, $2, $3, $4)', [chat_id, user_id, text, dateCreation]);

            res.status(200).send({messages: chatResult.rows});
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    async deleteMessage(req, res) {
        const {message_id} = req.body;
        try {
            const chatResult = await connection.query('DELETE FROM messages WHERE id = $1', [message_id]);

            res.status(200).send({isSuccess: true});
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    async updateMessage(req, res) {
        const {text, message_id} = req.body;
        try {
            const chatResult = await connection.query('UPDATE messages SET text = $1 WHERE id = $2', [text, message_id]);

            res.status(200).send({isSuccess: true});
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }
}


module.exports = new ChatController();


const bcrypt = require("bcryptjs");
const connection = require("../connect");
class UserController {
    async updateUser(req, res) {
        const { login, email, name, surname, img, patronymic } = req.body.data;
        const findUserQuery = `SELECT * FROM users WHERE login = $1`;
        try {
            const findResult = await connection.query(findUserQuery, [login]);
            if (findResult.rows.length === 0) {
                return res.status(404).json({ success: false, msg: "Пользователь не найден" });
            }

            const updateQuery = `
            UPDATE users
            SET 
                email = COALESCE($2, email), 
                name = COALESCE($3, name),
                surname = COALESCE($4, surname),
                img = COALESCE($5, img),
                patronymic = COALESCE($6, patronymic)
            WHERE login = $1
            RETURNING login, email, name, surname, password, patronymic;
        `;

            const updateResult = await connection.query(updateQuery, [login, email, name, surname, img, patronymic]);
            const updatedUserQuery = `SELECT * FROM users WHERE login = $1`;
            const updatedUser = await connection.query(updatedUserQuery, [login]);

            if (updatedUser.rows.length > 0) {
                return res.json({ success: true, user: updatedUser.rows[0] });
            } else {
                return res.status(400).json({ success: false, msg: "Не удалось обновить данные пользователя" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, msg: "Что-то пошло не так при попытке обновления данных пользователя" });
        }
    }

    async getUser(req, res) {
        const {id} = req.body;
        try {
            const query = "SELECT * FROM users WHERE id = $1";
            const result = await connection.query(query, [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ success: false, msg: "Пользователь не найден" });
            }
            return res.json(result.rows[0]);
        } catch (err) {
            return res.json({msg: "Что-то пошло не так"});
        }
    }

    async getUsers(req, res) {
        try {
            const query = "SELECT * FROM users";
            const result = await connection.query(query);
            return res.json(result.rows);
        } catch (err) {
            return res.json({msg: "Что-то пошло не так"});
        }
    }

    async grantAccess(req, res) {
        const { id, access } = req.body;
        try {
            const query = "UPDATE users SET access = $2 WHERE id = $1";
            const result = await connection.query(query, [id, access]);
            return res.json({isSuccess: true})
        } catch (err) {
            return res.json({isSuccess: false, msg: 'Что-то пошло не так'})
        }
    }

    async setUserRole(req, res) {
        const { id, role } = req.body;
        try {
            const query = "UPDATE users SET role = $2 WHERE id = $1";
            const result = await connection.query(query, [id, role]);
            return res.json({isSuccess: true})
        } catch (err) {
            return res.json({isSuccess: false, msg: 'Что-то пошло не так'})
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const query = "DELETE FROM users WHERE id = $1";
            const result = await connection.query(query, [id]);
            console.log(result)
            return res.json({isSuccess: true})
        } catch (err) {
            return res.json({isSuccess: false, msg: 'Что-то пошло не так'})
        }
    }
}


module.exports = new UserController();


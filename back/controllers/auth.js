const bcrypt = require("bcryptjs");
const connection = require("../connect");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../constants");
const { getToken } = require("../helpers");

function generateAccessToken(data) {
    const payload = {
        login: data.login,
        role: data.role,
    };
    return jwt.sign(payload, SECRET, { expiresIn: "2d" });
}

class AuthController {
    async verify(req, res, next) {
        const token = getToken(req);
        if (token === false)
            return res.status(401).json("Пользователь не зарегистрирован");
        try {
            req.user = jwt.verify(token, SECRET);
        } catch (e) {
            return res.status(403).json({msg: "Доступ запрещен", verify: false});
        }
        const result = await connection.query("SELECT login FROM users WHERE login=$1", [req.user.login]);
        if (result.rows.length === 0)
            return res.status(401).json("Пользователь не зарегистрирован");
        return next();
    }

    async login(req, res) {
        const {value, password} = req.body;
        try {
            const query = `SELECT id, login, email, role, name, surname, patronymic, access, password, img FROM users WHERE login = $1 OR email = $1`;
            const result = await connection.query(query, [value]);
            if (result.rows.length === 0)
                return res.status(404).json({isAuth: false, msg: "Пользователь с такими данными не найден"});
            if (!bcrypt.compareSync(password, result.rows[0].password))
                return res.status(400).json({isAuth: false, msg: "Пароль неверный"});
            if (!result.rows[0].access)
                return res.status(403).json({isAuth: false, msg: "Нет доступа"});
            const token = generateAccessToken(result.rows[0]);
            return res.json({ isAuth: true,
                id: result.rows[0].id,
                name: result.rows[0].name,
                surname: result.rows[0].surname,
                role: result.rows[0].role,
                patronymic: result.rows[0].patronymic,
                access: result.rows[0].access,
                login: result.rows[0].login,
                email: result.rows[0].email,
                img: result.rows[0].img,
                token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({isAuth: false, msg: "Что-то пошло не так"});
        }
    }

    async registration(req, res) {
        const { login, email, password, name, surname, patronymic = null, img = null } = req.body.data;
        try {
            const query = 'SELECT login FROM users WHERE login = $1';
            const result = await connection.query(query, [login]);
            if (result.rows.length === 0) {
                const hashPassword = await bcrypt.hash(password, 8);
                const dateRegistration = new Date().toISOString();
                const insertQuery = 'INSERT INTO users(login, email, password, name, surname, patronymic, role, access, img, date_registration) VALUES($1, $2, $3, $4, $5, $6, null, false, $7, $8)';
                await connection.query(insertQuery, [login, email, hashPassword, name, surname, patronymic, img, dateRegistration]);
                return res.json({ isReg: true });
            }
            return res.status(404).json({ isReg: false, msg: 'Пользователь с такими данными уже есть уже зарегистрирован' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ isReg: false, msg: 'Что-то пошло не так' });
        }
    }
}


module.exports = new AuthController();


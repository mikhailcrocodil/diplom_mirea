const connection = require("../connect");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // временно сохраняет файлы в папке `uploads`
const fs = require("fs"); // временно сохраняет файлы в папке `uploads`

class FilesController {
    async uploadFile(req, res) {
        const { file } = req.file; // исправление: получаем данные о файле из req.file вместо req.body
        const { originalname, mimetype, size, path } = file;
        const fileContent = fs.readFileSync(path); // Читаем содержимое файла

        try {
            await connection.query(
                'INSERT INTO files(name, type, size, content) VALUES($1, $2, $3, $4)',
                [originalname, mimetype, size, fileContent]
            );
            res.send('Файл загружен успешно.');
        } catch (err) {
            console.error(err);
            res.status(500).send('Ошибка при загрузке файла.');
        }
    }
}


module.exports = new FilesController();


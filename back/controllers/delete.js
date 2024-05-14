const connection = require("../connect");
class DeleteController {
    async DeleteCourse(req, res) {
        const {course_id} = req.body;
        try {
            const {theme_id} = req.body;
            const queryDeleteCourse = await connection.query(
                'DELETE FROM course WHERE id = $1',
                [course_id]
            );
            const queryDeleteConnection = await connection.query(
                'DELETE FROM course_modules WHERE course_id = $1',
                [course_id]
            );
            res.status(200).send({isSuccess: true});
        } catch (err) {
            console.error(err);
            res.status(500).send('Ошибка при удалении курса.');
        }
    }
    async DeleteTheme(req, res) {
        const {theme_id} = req.body;
        try {
            const queryDeleteConnectionModules = await connection.query(
                'DELETE FROM modules_themes WHERE theme_id = $1',
                [theme_id]
            );
            const queryDeleteConnection = await connection.query(
                'DELETE FROM themes_materials WHERE theme_id = $1',
                [theme_id]
            );
            const queryDeleteTheme = await connection.query(
                'DELETE FROM themes WHERE id = $1',
                [theme_id]
            );
            res.status(200).send({isSuccess: true});
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    async DeleteModule(req, res) {
        const {module_id} = req.body;
        try {
            const queryDeleteConnectionModules = await connection.query(
                'DELETE FROM modules_themes WHERE module_id = $1',
                [module_id]
            );
            const queryDeleteConnection = await connection.query(
                'DELETE FROM course_modules WHERE module_id = $1',
                [module_id]
            );
            const queryDeleteTheme = await connection.query(
                'DELETE FROM modules WHERE id = $1',
                [module_id]
            );
            res.status(200).send({isSuccess: true});
        } catch (err) {
            console.error(err);
            res.status(500).send('Ошибка при удалении темы.');
        }
    }

    async DeleteMaterial(req, res) {
        const {material_id, type} = req.body;
        try {
            const queryFirst = await connection.query(
                'DELETE FROM themes_materials WHERE material_id = $1',
                [material_id]
            );
            if (type === "file") {
                const query = await connection.query(
                    'DELETE FROM materials_files WHERE material_id = $1',
                    [material_id]
                );
            }
            if (type === "task") {
                const query = await connection.query(
                    'DELETE FROM tasks WHERE material_id = $1',
                    [material_id]
                );
            }
            if (type === "info") {
                const query = await connection.query(
                    'DELETE FROM materials_info_content WHERE material_id = $1',
                    [material_id]
                );
            }
            if (type === "test") {
                const query = await connection.query(
                    'DELETE FROM materials_info_content WHERE material_id = $1',
                    [material_id]
                );
            }
            res.status(200).send({isSuccess: true});
        } catch (err) {
            console.error(err);
            res.status(500).send('Ошибка при удалении темы.');
        }
    }
}


module.exports = new DeleteController();


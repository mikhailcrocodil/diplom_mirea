const connection = require("../connect");
class CourseController {
    async getStudentCourses(req, res) {
        const { userId } = req.params;
        try {
            const queryText = `
            SELECT DISTINCT ON (c.id)
                   c.*, 
                   u.id AS teacher_id, 
                   u.name AS teacher_name, 
                   u.surname AS teacher_surname, 
                   u.patronymic AS teacher_patronymic, 
                   u.email AS teacher_email, 
                   u.role AS teacher_role
            FROM course c
            JOIN users_courses uc ON c.id = uc.course_id
            JOIN users u ON c.teacher_id = u.id
            WHERE uc.user_id = $1 OR c.teacher_id = $1
            ORDER BY c.id
        `;
            const result = await connection.query(queryText, [userId]);
            const courses = result.rows.map(course => {
                const courseData = {
                    course: {
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        duration: course.duration,
                    },
                    teacher: {
                        id: course.teacher_id,
                        name: course.teacher_name,
                        patronymic: course.teacher_patronymic,
                        surname: course.teacher_surname,
                        email: course.teacher_email,
                        role: course.teacher_role,
                    }
                };
                                return courseData;
            });
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getFullCourses(req, res) {
        try {
            const queryText = `
            SELECT DISTINCT ON (c.id) 
                   c.*, 
                   u.id AS teacher_id, 
                   u.name AS teacher_name, 
                   u.surname AS teacher_surname, 
                   u.patronymic AS teacher_patronymic, 
                   u.email AS teacher_email, 
                   u.role AS teacher_role
            FROM course c
            LEFT JOIN users_courses uc ON c.id = uc.course_id
            LEFT JOIN users u ON c.teacher_id = u.id
            ORDER BY c.id
        `;
            const result = await connection.query(queryText);
            const courses = result.rows.map(course => {
                const courseData = {
                    course: {
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        duration: course.duration,
                    },
                    teacher: {
                        id: course.teacher_id,
                        name: course.teacher_name,
                        patronymic: course.teacher_patronymic,
                        surname: course.teacher_surname,
                        email: course.teacher_email,
                        role: course.teacher_role,
                    }
                };
                return courseData;
            });
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllCourses(req, res) {
        try {
            const queryText = `SELECT * FROM course`;
            const result = await connection.query(queryText);
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addAttempt(req, res) {
        const {userId, testId, currentDate} = req.body;
        try {
            const queryText = `INSERT INTO attempts (user_id, test_id, start_time) values ($1, $2, $3) RETURNING id`;
            const result = await connection.query(queryText, [userId, testId, currentDate]);
            res.status(200).json({isSuccess: true, result: result.rows[0].id})
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCourse(req, res) {
        const { courseId, studentId } = req.body;
        try {
            const queryModulesText = `
            SELECT m.*
            FROM modules m
            JOIN course_modules cm ON m.id = cm.module_id
            JOIN course c ON c.id = m.course_id
            WHERE cm.course_id = $1
        `;
            let adaptiveTests = null;
            if (studentId) {
                const adaptiveTestsQuery = await connection.query(`SELECT * FROM users_adaptive_test WHERE user_id = $1 AND course_id = $2`, [studentId, courseId]);
                if (adaptiveTestsQuery.rows.length) {
                    console.log(adaptiveTestsQuery.rows)
                    const testsPromises = adaptiveTestsQuery.rows.map(test => {
                        const queryTestText = `SELECT * FROM tests WHERE id = $1`;
                        return connection.query(queryTestText, [test.test_id])
                            .then(resultTest => resultTest.rows[0]); // предполагая, что каждый запрос возвращает один тест
                    });
                    const testsResults = await Promise.all(testsPromises);
                    adaptiveTests = testsResults;
                }
            }
            const queryCourseText = `SELECT * FROM course WHERE id = $1`
            const resultCourse = await connection.query(queryCourseText, [courseId]);
            const resultModules = await connection.query(queryModulesText, [courseId]);
            const modules = await Promise.all(resultModules.rows.map(async (module) => {
                const queryThemesText = `SELECT t.* FROM themes t JOIN modules_themes mt ON t.id = mt.theme_id WHERE mt.module_id = $1`;
                const resultThemes = await connection.query(queryThemesText, [module.id]);

                const themes = await Promise.all(resultThemes.rows.map(async (theme) => {
                    const queryMaterialText = `SELECT m.* FROM materials m JOIN themes_materials tm ON m.id = tm.material_id WHERE tm.theme_id = $1`;
                    const resultMaterials = await connection.query(queryMaterialText, [theme.id]);
                    return {
                        ...theme,
                        materials: resultMaterials.rows,
                    };
                }));

                return {
                    module,
                    themes: themes,
                };
            }));
            const result =
                {
                    adaptiveTests: adaptiveTests,
                    course: resultCourse.rows,
                    modules: modules,
                }
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async getInfoContent(req, res){
        const {materialId} = req.params;
        try {
            const queryMaterialText = `SELECT * FROM materials WHERE id = $1`;
            const resultMaterialContent = await connection.query(queryMaterialText, [materialId]);
            const queryInfoContentText = `SELECT ic.* FROM info_content ic JOIN materials_info_content m_ic ON ic.id = m_ic.content_id WHERE m_ic.material_id = $1`;
            const resultInfoContent = await connection.query(queryInfoContentText, [materialId]);

            const result =
                {
                    material: resultMaterialContent.rows,
                    content: resultInfoContent.rows,
                }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addTheme(req, res) {
        const {title, moduleId} = req.body;
        try {
            const queryModuleText = `INSERT INTO themes(title) VALUES ($1) RETURNING id`;
            const resultModule = await connection.query(queryModuleText, [title]);

            const queryConnectText = 'INSERT INTO modules_themes(theme_id, module_id) VALUES($1, $2)';
            const resultQuestions = await connection.query(queryConnectText, [resultModule.rows[0].id, moduleId]);
            res.status(200).json({isSuccess: true})
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getTest(req, res){
        const { materialId } = req.params;
        try {
            const queryTestText = `SELECT * FROM tests WHERE material_id = $1`;
            const resultTest = await connection.query(queryTestText, [materialId]);
            const queryQuestionsText = `SELECT q.* FROM questions q JOIN tests_questions tq ON q.id = tq.question_id WHERE tq.test_id = $1`
            const resultQuestions = await connection.query(queryQuestionsText, [resultTest.rows[0].id]);
            const answers = await Promise.all(resultQuestions.rows.map(async (question) => {
                const queryAnswersText = `SELECT id, question_id, answer_text FROM answers WHERE question_id = $1 `;
                const resultQuestions = await connection.query(queryAnswersText, [question.id]);
                return {
                    question: question,
                    answers: resultQuestions.rows
                };
            }))

            const result = {
                test: resultTest.rows,
                questions: answers,
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAdaptiveTest(req, res){
        const { student_id } = req.body;
        try {
            const queryTestText = `SELECT * FROM tests WHERE user_id = $1`;
            const resultTest = await connection.query(queryTestText, [student_id]);

            res.status(200).json(resultTest.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getTask(req, res) {
        const { materialId } = req.params;
        try {
            const queryTaskText = 'SELECT t.* FROM tasks t WHERE material_id = $1';
            const resultTask = await connection.query(queryTaskText, [materialId]);

            const queryStudentAnswersText = 'SELECT tsa.* FROM tasks_students_answers tsa WHERE task_id = $1';
            const resultAnswer = await connection.query(queryStudentAnswersText, [resultTask.rows[0].id]);

            let studentAnswers = null;
            let teacherAnswers = null;

            if (resultAnswer.rows.length > 0) {
                const queryTeacherAnswersText = 'SELECT tta.* FROM tasks_teachers_answer tta WHERE student_answer_id = $1';
                const resultAnswerTeacher = await connection.query(queryTeacherAnswersText, [resultAnswer.rows[0].id]);
                studentAnswers = resultAnswer.rows;
                teacherAnswers = resultAnswerTeacher.rows.length > 0 ? resultAnswerTeacher.rows : null;
            }

            const result = {
                task: resultTask.rows[0],
                studentAnswers,
                teacherAnswers
            };
            res.status(200).json({ ...result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getAttemptsTestCount(req, res) {
        const {userId, testId} = req.body;
        try {
            const queryAttemptsText = `SELECT * FROM attempts WHERE user_id = $1 AND test_id = $2`
            const resultAttempts = await connection.query(queryAttemptsText, [userId, testId]);
            const queryTestText = `SELECT * FROM tests WHERE id = $1`;
            const resultTest = await connection.query(queryTestText, [testId]);
            const result = {
                userAttempted: resultAttempts.rows.length,
                testAttempt: resultTest.rows[0].number_attempts
            }
            res.status(200).json({result})
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addTestToTheme(req, res) {
        const {themeId, questions, infoTest} = req.body;
        try {
            const queryMaterialText = 'INSERT INTO materials(title, description, type) VALUES($1, $2, $3) RETURNING id';
            const resultMaterial = await connection.query(queryMaterialText, [infoTest.title, infoTest.description, "test"]);
            const queryConnectionText = 'INSERT INTO themes_materials(theme_id, material_id) VALUES($1, $2)';
            const resultConnection = await connection.query(queryConnectionText, [themeId, resultMaterial.rows[0].id]);

            const queryTestText = 'INSERT INTO tests(material_id, title, description, duration, final_date, number_attempts) VALUES($1, $2, $3, $4, $5, $6) RETURNING id';
            const resultTest = await connection.query(queryTestText, [resultMaterial.rows[0].id, infoTest.title, infoTest.description, infoTest.duration, infoTest.final_date, infoTest.number_attempts]);

            await Promise.all(questions.map(async (item) => {
                const {question, answers} = item;
                const queryQuestionText = 'INSERT INTO questions(question_text) VALUES($1) RETURNING id';
                const resultQuestion = await connection.query(queryQuestionText, [question.question_text]);

                const queryConnectTestText = 'INSERT INTO tests_questions(test_id, question_id) VALUES($1, $2)';
                const resultConnectTest = await connection.query(queryConnectTestText, [resultTest.rows[0].id, resultQuestion.rows[0].id]);

                await Promise.all(answers.map(async (answer) => {
                    const queryAnswerText = 'INSERT INTO answers(question_id, answer_text, is_correct) VALUES($1, $2, $3)';
                    const resultAnswer = await connection.query(queryAnswerText, [resultQuestion.rows[0].id, answer.answer_text, answer.is_correct]);
                }))
            }))

            res.status(200).json({isSuccess: true})
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async getAttempts(req, res) {
        const {user_id, test_id} = req.body;
        try {
            const { rows } = await connection.query('SELECT * FROM attempts WHERE user_id = $1 AND test_id  = $2', [user_id, test_id]);
            res.status(200).json({attempts: rows})
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async getUsersOnCourse(req, res) {
        const {course_id, role} = req.body;
        try {
            const query = `
                SELECT u.id, u.name, u.surname, u.patronymic
            FROM users u
            WHERE EXISTS (
                SELECT 1
            FROM users_courses uc
            WHERE uc.user_id = u.id
            AND uc.course_id = $1
        )
            AND u.role = $2
        `;
            const { rows } = await connection.query(query, [course_id, role]);
            res.status(200).json(rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async addModule(req, res) {
        const {course_id, title, description, purpose_module} = req.body;
        try {
            const queryText = `INSERT INTO modules (title, description, purpose_module, course_id) VALUES ($1, $2, $3, $4) RETURNING id`;
            const result = await connection.query(queryText, [title, description, purpose_module, course_id]);

            const queryTextConn = `INSERT INTO course_modules (course_id, module_id) VALUES ($1, $2)`;
            const resultConn = await connection.query(queryTextConn, [course_id, result.rows[0].id]);
            res.status(200).json({isSuccess: true})
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async addStudentAnswerToTask(req, res) {
        const { task_id, user_id, answer_text } = req.body;
        try {
            const queryTaskText = 'INSERT INTO tasks_students_answers (answer_text, task_id, user_id) values ($1, $2, $3)';
            const resultTask = await connection.query(queryTaskText, [answer_text, task_id, user_id]);

            res.status(200).json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getStudentAnswerToTask(req, res) {
        const { user_id, test_id } = req.body;
        try {
            const queryTaskText = 'SELECT tsa.* FROM tasks_students_answers tsa WHERE user_id = $1 AND task_id = $2';
            const resultTask = await connection.query(queryTaskText, [user_id, test_id]);
            const result = resultTask.rows
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getTaskAnswer(req, res) {
        const { material_id, answer_id } = req.body;
        try {
            const queryTaskText = 'SELECT t.* FROM tasks t WHERE material_id = $1';
            const resultTask = await connection.query(queryTaskText, [material_id]);

            const queryStudentAnswersText = 'SELECT tsa.* FROM tasks_students_answers tsa WHERE id = $1';
            const resultAnswer = await connection.query(queryStudentAnswersText, [answer_id]);

            res.status(200).json({ ...resultAnswer.rows[0] });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getTaskAnswers(req, res) {
        const { test_id } = req.body;
        try {
            const queryTaskText = 'SELECT tsa.* FROM tasks_students_answers tsa WHERE task_id = $1';
            const resultTask = await connection.query(queryTaskText, [test_id]);

            const result = await Promise.all(resultTask.rows.map(async (result) => {
                const queryUser = 'SELECT u.* FROM users u WHERE id = $1';
                const resultUser = await connection.query(queryUser, [result.user_id]);
                return {
                    ...result,
                    user: resultUser.rows[0],
                }
            }));
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async addTeacherAnswer(req, res) {
        const { score, comment, student_answer_id, teacher_id } = req.body;
        try {
            const queryTaskText = 'UPDATE tasks_students_answers tsa SET score = $1, is_check = $2, teacher_comment = $3 WHERE tsa.id = $4';
            const resultTask = await connection.query(queryTaskText, [score, true, comment, student_answer_id]);

            const queryText = 'INSERT INTO tasks_teachers_answer (teacher_id, comment, student_answer_id) VALUES ($1, $2, $3)';
            const result = await connection.query(queryText, [teacher_id, comment, student_answer_id]);
            res.status(200).json({ isSuccess: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async addQuestionForAdaptiveTest(req, res) {
        const {question, answers, topic_id} = req.body;
        try {
            const queryQuestion = await connection.query(`INSERT INTO questions (topic_id, difficulty, question_text) VALUES($1, $2, $3) RETURNING id`, [topic_id, question.difficulty, question.question_text]);
            await Promise.all(answers.map(async (answer) => {
                await connection.query(`INSERT INTO answers (question_id, answer_text, is_correct) values ($1, $2, $3)`, [queryQuestion.rows[0].id, answer.answer_text, answer.is_correct]);
            }))
            res.status(200).send("ok");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async addThemeForAdaptiveTest(req, res) {
        const {theme_title, course_title} = req.body;
        try {
            const querySubject = await connection.query(`SELECT * FROM subject WHERE title = $1`, [course_title]);
            const query = await connection.query(`INSERT INTO topic (topic_text, subject_id) VALUES ($1, $2)`, [theme_title, querySubject.rows[0].id]);
            res.status(200).send("ok");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getAdaptiveTestCourseInfo(req, res) {
        const {userId, course_title} = req.body;
        try {
            const queryUser = await connection.query(`SELECT role FROM users WHERE id = $1`, [userId]);
            if (queryUser.rows[0].role === 'student') {
                res.status(401).send("Доступ запрещен");
            }
            else {
                const querySubjectFirst = await connection.query(`SELECT * FROM subject WHERE title = $1`, [course_title]);
                if (!querySubjectFirst.rows[0]) {
                    await connection.query(`INSERT INTO subject (title) VALUES ($1)`, [course_title]);
                }
                const querySubject = await connection.query(`SELECT * FROM subject WHERE title = $1`, [course_title]);
                const queryTopics = await connection.query(`SELECT * FROM topic WHERE subject_id = $1`, [querySubject.rows[0].id]);

                const questions = await Promise.all(queryTopics.rows.map(async (topic) => {
                    const queryQuestions = await connection.query(`SELECT * FROM questions WHERE topic_id = $1`, [topic.id]);
                    const answers = await Promise.all(queryQuestions.rows.map(async (question) => {
                        const queryAnswer = await connection.query(`SELECT * FROM answers WHERE question_id = $1`, [question.id]);
                        return {
                            ...question,
                            answers: queryAnswer.rows
                        }
                    }))
                    return {
                        ...topic,
                        topicQuestions: answers
                    }
                }))
                res.status(200).json({data: questions})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getUsersForAdaptiveTest(req, res) {
        const {course_id} = req.body;
        try {
            const query = `
            SELECT u.id, u.name, u.surname, u.patronymic
            FROM users u 
            WHERE u.role = $2 AND EXISTS (
                SELECT 1 
                FROM users_courses uc
                WHERE uc.user_id = u.id AND uc.course_id = $1
            );
    `;
        const result = await connection.query(query, [course_id, "student"]);
        res.status(200).json({users: result.rows})
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getStudentsAdaptiveTestsInfo(req, res) {
        const {course_id} = req.body;
        try {
            const infoQuery = await connection.query(`SELECT * FROM users_adaptive_test WHERE course_id = $1`, [course_id]);
            const result = await Promise.all(infoQuery.rows.map(async (info, index) => {
                const userQuery = await connection.query(`SELECT * FROM users WHERE id = $1`, [info.user_id]);
                const user = {
                    name: userQuery.rows[0].name,
                    surname: userQuery.rows[0].surname,
                    patronymic: userQuery.rows[0].patronymic,
                }
                const adapTestInfoQuery = await connection.query(`SELECT * FROM adaptive_test_info WHERE test_id = $1`, [info.test_id]);
                const testResult = await Promise.all(adapTestInfoQuery.rows.map(async (result, index) => {
                    console.log(result)
                    const topic = await connection.query(`SELECT * FROM topic WHERE id = $1`, [result.topic_id]);
                    return {
                        ...result,
                        topic: topic.rows[0].topic_text
                    }
                }))
                return {
                    ...info,
                    user,
                    result: testResult
                }
            }))
            res.status(200).json({result})
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteAdaptiveTestQuestion(req, res) {
        const {question_id} = req.body;
        try {
            const deleteAnswersQuery = await connection.query(`DELETE FROM answers WHERE question_id = $1`, [question_id])
            const deleteQuestionQuery = await connection.query(`DELETE FROM questions WHERE id = $1`, [question_id])
            res.status(200).send("ok");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async addTask(req, res) {
        const {img, title, task, final_date, theme_id } = req.body;
        try {
            const queryText = `INSERT INTO materials (title, type) VALUES ($1, $2) RETURNING id`;
            const result = await connection.query(queryText, [title, "task"]);

            const queryTextTM = `INSERT INTO themes_materials (theme_id, material_id) VALUES ($1, $2)`;
            const resultTM = await connection.query(queryTextTM, [theme_id, result.rows[0].id]);

            const queryTextConn = `INSERT INTO tasks (task_title, img, material_id, task, final_date) VALUES ($1, $2, $3, $4, $5)`;
            const resultConn = await connection.query(queryTextConn, [title, img, result.rows[0].id, task, final_date]);
            res.status(200).json({isSuccess: true})
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async addInfoContent(req, res) {
        const {materials, material_title, theme_id} = req.body;
        try {
            const addMaterial = `INSERT INTO materials (title, type) VALUES ($1, $2) RETURNING id`;
            const addMaterialResult = await connection.query(addMaterial, [material_title, "info"]);
            const material_id = addMaterialResult.rows[0].id;

            const addConnection = `INSERT INTO themes_materials (theme_id, material_id) VALUES ($1, $2)`;
            const addConnectionResult = await connection.query(addConnection, [theme_id, material_id]);
            const result = await Promise.all(materials.map(async (material) => {
                const {content, title_paragraph, title_block, img_caption, type, video_url} = material;
                const query = `INSERT INTO info_content (content, title_paragraph, title_block, img_caption, type, video_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
                const queryResult = await connection.query(query, [content, title_paragraph, title_block, img_caption, type, video_url]);
                const s = `INSERT INTO materials_info_content (material_id, content_id) VALUES ($1, $2)`;
                const d = await connection.query(s, [material_id, queryResult.rows[0].id]);
            }))
            res.status(200).json({isSuccess: true})
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async getCourseUsers(req, res) {
        const {course_id, role} = req.body;
        try {
            const query = `
                SELECT u.id, u.name, u.surname
            FROM users u
            WHERE NOT EXISTS (
            SELECT 1
            FROM users_courses uc
            WHERE uc.user_id = u.id
            AND uc.course_id = $1
        )
        AND NOT EXISTS (
            SELECT 1
            FROM course c
            WHERE c.teacher_id = u.id
            AND c.id = $1
        )
            AND u.role = $2
        `;
            const { rows } = await connection.query(query, [course_id, role]);
            res.status(200).json(rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async setTeacherToCourse(req, res) {
        const {course_id, teacher_id} = req.body;
        try {
            const query = `UPDATE course c SET teacher_id = $1 WHERE c.id = $2`;
            const { rows } = await connection.query(query, [teacher_id, course_id]);
            res.status(200).json(rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async setStudentToCourse(req, res) {
        const {course_id, student_id} = req.body;
        try {
            const query = `INSERT INTO users_courses (user_id, course_id) VALUES ($1, $2)`;
            const { rows } = await connection.query(query, [student_id, course_id]);
            res.status(200).json({isSuccess: true})
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async removeStudentFromCourse(req, res) {
        const {course_id, student_id} = req.body;
        try {
            const query = `DELETE FROM users_courses WHERE user_id = $1 AND course_id = $2`;
            const { rows } = await connection.query(query, [student_id, course_id]);
            res.status(200).json(rows)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addCourse(req, res) {
        const {title, duration, description} = req.body;
        try {
            const queryText = `INSERT INTO course (title, duration, description) values ($1, $2, $3)`;
            const result = await connection.query(queryText, [title, duration, description]);
            res.status(200).json({isSuccess: true})
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async submitAttempt(req, res) {
        const { attempt_id, responses, end_date } = req.body; // Получаем попытку и ответы
        let score = 0;
        let correctAnswersCount = 0;
        const responsePromises = responses.map(async response => {
            const { rows } = await connection.query('SELECT is_correct FROM answers JOIN questions ON questions.id = answers.question_id WHERE answers.id = $1', [response.answer_id]);
            if (rows.length > 0) {
                const { is_correct } = rows[0];
                await connection.query('INSERT INTO attempts_questions (attempt_id, question_id, is_correct) VALUES ($1, $2, $3)', [attempt_id, response.question_id, is_correct]);
                return { is_correct };
            }
            return null;
        });

        const resolvedResponses = await Promise.all(responsePromises);

        resolvedResponses.forEach(response => {
            if (response !== null) {
                const { is_correct } = response;
                if (is_correct) {
                    correctAnswersCount++;
                }
            }
        });

        await connection.query('UPDATE attempts SET score = $1, end_time = $2, correct_answers_count = $3, total_questions = $4 WHERE id = $5', [score, end_date, correctAnswersCount, responses.length, attempt_id]);

        res.status(200).json({
            score,
            correctAnswersCount,
            totalQuestions: responses.length
        });
    }

    async generateTest(req, res) {
        const {student_id} = req.body;
        try {
            const topicsQuery = 'SELECT id FROM topic';
            const topicRows = await connection.query(topicsQuery);
            const topics = topicRows.rows;
            const numTopics = topics.length;
            // const usedQuestionsQuery = 'SELECT question_id FROM used_questions';
            // const usedQuestionsRows = await connection.query(usedQuestionsQuery);
            // const usedQuestions = usedQuestionsRows.rows.map(row => row.question_id);
            let selectedQuestions = [];
            let totalDifficulty = 0;
            const maxQuestionsPerTopic = Math.floor(12 / numTopics);
            for (const topic of topics) {
                const topicId = topic.id;
                const questionsQuery = 'SELECT id, difficulty FROM questions WHERE topic_id = $1';
                const questionRows = await connection.query(questionsQuery, [topicId]);
                const questions = questionRows.rows;
                const groupedQuestions = questions.reduce((acc, question) => {
                    const difficulty = question.difficulty;
                    if (!acc[difficulty]) {
                        acc[difficulty] = [];
                    }
                    acc[difficulty].push(question);
                    return acc;
                }, {});
                for (const difficulty in groupedQuestions) {
                    const questions = groupedQuestions[difficulty];
                    const selectedForDifficulty = questions.sort(() => 0.5 - Math.random()).slice(0, maxQuestionsPerTopic);
                    selectedQuestions = selectedQuestions.concat(selectedForDifficulty);
                    totalDifficulty += selectedForDifficulty.reduce((acc, question) => acc + question.difficulty, 0);
                }
            }
            const difficultyDiff = 16 - totalDifficulty;
            if (difficultyDiff > 0) {
                const hardestQuestions = await connection.query('SELECT id, difficulty FROM questions WHERE difficulty = 3 ORDER BY RANDOM() LIMIT $1', [difficultyDiff]);
                selectedQuestions = selectedQuestions.concat(hardestQuestions.rows);
            } else if (difficultyDiff < 0) {
                const easiestQuestions = selectedQuestions.filter(q => q.difficulty === 1);
                const numToRemove = Math.abs(difficultyDiff);
                selectedQuestions = selectedQuestions.filter(q => !(q.difficulty === 1 && easiestQuestions.indexOf(q) < numToRemove));
            }
            const addToMaterialQuery = `INSERT INTO materials (title, type) VALUES ($1, $2) RETURNING id`;
            const resultMaterial = await connection.query(addToMaterialQuery, ["Адаптивный тест", "test"]);
            const createTestQuery = 'INSERT INTO tests (title, user_id, material_id) VALUES ($1, $2, $3) RETURNING id';
            const testValues = ['Адаптивный тест', student_id, resultMaterial.rows[0].id];
            const testResult = await connection.query(createTestQuery, testValues);
            const testId = testResult.rows[0].id;
            const questionIds = selectedQuestions.map(q => q.id);
            const questionValues = questionIds.map((id, index) => [testId, id]);
            const addQuestionsQuery = 'INSERT INTO tests_questions (test_id, question_id) VALUES ($1, $2)';
            for (const [testId, questionId] of questionValues) {
                await connection.query(addQuestionsQuery, [testId, questionId]);
            }
            const addToUserQuery = `INSERT INTO users_adaptive_test (user_id, test_id) VALUES ($1, $2)`;
            await connection.query(addToUserQuery, [student_id, testId]);
            res.status(200).send('Адаптивный тест успешно создан');
        } catch (err) {
            console.error(err);
            res.status(500).send('Ошибка при создании адаптивного теста');
        }
    }

    async createAdaptiveTest(req, res) {
        const {user_id, course_id} = req.body;
        try {
            const queryCourse = await connection.query(`SELECT * FROM course WHERE id = $1`, [course_id]);
            const createMaterialQuery = await connection.query(`INSERT INTO materials (title, type) VALUES ($1, $2) RETURNING id`, ["Адаптивный тест студента", "test"]);
            const createTestQuery = await connection.query(`INSERT INTO tests (material_id, title, user_id, course_title) VALUES ($1, $2, $3, $4) RETURNING id`, [createMaterialQuery.rows[0].id, "Адаптивный тест", user_id, queryCourse.rows[0].title]);
            const logO = Math.floor(Math.random() * 8) + 1;
            const query = await connection.query(`UPDATE users_courses SET user_logo = $1 WHERE user_id = $2 AND course_id = $3`, [logO, user_id, course_id])
            const connectionQuery = await connection.query(`INSERT INTO users_adaptive_test (user_id, test_id, course_id) VALUES ($1, $2, $3)`, [user_id, createTestQuery.rows[0].id, course_id]);
            res.status(200).send("ok");
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async getAdaptiveTestQuestion(req, res) {
        const { test_id, difficulty, current_topic_index } = req.body;
        try {
            const queryTest = await connection.query(`SELECT * FROM tests WHERE id = $1`, [test_id]);
            const testInfo = queryTest.rows[0];
            const querySubject = await connection.query(`SELECT * FROM subject WHERE title = $1`, [testInfo.course_title]);
            const subjectInfo = querySubject.rows[0];
            const queryTopics = await connection.query(`SELECT * FROM topic WHERE subject_id = $1`, [subjectInfo.id]);
            const topics = queryTopics.rows;
            const queryQuestion = await connection.query(`
            SELECT *
            FROM questions
            WHERE topic_id = $1 AND difficulty = $2
            ORDER BY RANDOM()
            LIMIT 1
        `, [topics[current_topic_index].id, difficulty]);
            console.log(queryTopics.rows)
            console.log(topics[current_topic_index].id, difficulty, queryQuestion.rows)
            const questionInfo = queryQuestion.rows[0];
            const queryAnswers = await connection.query(`SELECT id, answer_text FROM answers WHERE question_id = $1`, [questionInfo.id])

            res.json({
                topic: topics[current_topic_index].id,
                question: questionInfo.question_text,
                question_id: questionInfo.id,
                answers: queryAnswers.rows,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getAdaptiveTestResult(req, res) {
        const {test_id} = req.body;
        try {
            const courseTitle = await connection.query(`SELECT * FROM tests WHERE id = $1`, [test_id]);
            const subjectResult = await connection.query(`SELECT * FROM subject WHERE title = $1`, [courseTitle.rows[0].course_title])
            const topicResult = await connection.query(`SELECT * FROM topic WHERE subject_id = $1`, [subjectResult.rows[0].id]);
            const infoResult = await connection.query(`SELECT * FROM adaptive_test_info WHERE test_id = $1`, [test_id]);
            const spread = await Promise.all(infoResult.rows.map((result, index) => {
                return {
                    ...result,
                    topic: topicResult.rows[index]
                }
            }))
            res.status(200).json({result: spread})
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    async answerAdaptiveTestQuestion(req, res) {
        const {answer_id, test_id, currentDifficulty, question_id, topic_id, user_id, course_id, current_question_index} = req.body;
        try {
            let nextDifficulty = currentDifficulty;
            let isRightAnswer = false;
            const answerQuery = await connection.query(`SELECT * FROM answers WHERE question_id = $1`, [question_id]);
            const rightAnswer = answerQuery.rows.find((answer) => {
                return answer.is_correct;
            })
            if (rightAnswer.id === answer_id) {
                isRightAnswer = true;
            }
            if (isRightAnswer === true) {
                if (currentDifficulty === 8) {
                    nextDifficulty = 8;
                }
                else {
                    nextDifficulty = currentDifficulty + 1;
                }
            }
            if (isRightAnswer === false) {
                if (currentDifficulty === 1) {
                    nextDifficulty = 1;
                }
                else {
                    nextDifficulty = currentDifficulty - 1;
                }
            }
            const getPQuery = await connection.query(`SELECT * FROM adaptive_test_info WHERE test_id = $1`, [test_id]);
            let pSum = 0;
            getPQuery.rows.forEach(current => {
                pSum += current.p;
            });
            const wp = pSum;
            const newUserLog = 4 - Math.log(1/wp-1)
            console.log(wp, 4-Math.log(1/wp-1))
            const query = await connection.query(`SELECT * FROM users_courses WHERE user_id = $1 AND course_id = $2`, [user_id, course_id])
            const user_log = query.rows[0].user_logo;
            console.log(user_log)
            const getTestInfo = await connection.query(`SELECT * FROM adaptive_test_info WHERE test_id = $1 AND topic_id = $2`, [test_id, topic_id]);
            const p = 1/(1 + Math.E**(user_log-currentDifficulty));
            const testInfo = getTestInfo.rows[0];
            if (testInfo) {
                await connection.query(`UPDATE adaptive_test_info SET p = $1 WHERE test_id = $2 AND topic_id = $3`, [p, test_id, topic_id]);
            }
            else {
                await connection.query(`INSERT INTO adaptive_test_info (test_id, topic_id, p) VALUES ($1, $2, $3)`, [test_id, topic_id, Number(p)]);
            }
            if (current_question_index === 39) {
                const getPQuery = await connection.query(`SELECT * FROM adaptive_test_info WHERE test_id = $1`, [test_id]);
                let pSum = 0;
                getPQuery.rows.forEach(current => {
                    pSum += current.p;
                });
                const p = pSum;
                console.log(4 - Math.log(Math.abs(1/p - 1)).toFixed(0))
                await connection.query(`UPDATE users_courses SET user_logo = $1 WHERE user_id = $2 AND course_id = $3`, [4 - Math.log(Math.abs(1/p - 1)).toFixed(0), user_id, course_id]);
            }
            res.status(200).json({nextDifficulty})
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }
}




module.exports = new CourseController();


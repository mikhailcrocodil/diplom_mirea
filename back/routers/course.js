const express = require("express");
const router = express.Router();
const Auth = require("../controllers/auth");
const Course = require("../controllers/course");

router.post("/add-course", Auth.verify, Course.addCourse);

router.get("/get-users-courses/:userId", Auth.verify, Course.getStudentCourses);
router.post("/get-course", Auth.verify, Course.getCourse);
router.get("/get-info-content/:materialId", Auth.verify, Course.getInfoContent);
router.get("/get-test/:materialId", Auth.verify, Course.getTest);
router.post("/get-user-test-attempts", Auth.verify, Course.getAttemptsTestCount);
router.post("/add-test", Auth.verify, Course.addTestToTheme);
router.get("/get-courses", Auth.verify, Course.getAllCourses);
router.get("/get-all-courses", Auth.verify, Course.getFullCourses);
router.post("/add-attempt", Auth.verify, Course.addAttempt);
router.post("/get-attempts", Auth.verify, Course.getAttempts);
router.post("/submit-attempt", Auth.verify, Course.submitAttempt);
router.post("/get-users-courses-list", Auth.verify, Course.getCourseUsers);
router.post("/add-info-content", Auth.verify, Course.addInfoContent)
router.post("/get-course-with-users", Auth.verify, Course.getUsersOnCourse);

router.post("/update-course-teacher", Auth.verify, Course.setTeacherToCourse);
router.post("/add-new-student", Auth.verify, Course.setStudentToCourse);
router.post("/remove-student-from-course", Auth.verify, Course.removeStudentFromCourse);



router.get("/get-task/:materialId", Auth.verify, Course.getTask);

router.post("/add-theme", Auth.verify, Course.addTheme);
router.post("/add-module", Auth.verify, Course.addModule);
router.post("/add-task", Auth.verify, Course.addTask);
router.post("/add-test", Auth.verify, Course.addTestToTheme);
router.post("/add-attempt", Auth.verify, Course.addAttempt);
router.post("/add-student-answer", Auth.verify, Course.addStudentAnswerToTask);
router.post("/get-student-answers", Auth.verify, Course.getStudentAnswerToTask);
router.post("/get-all-student-answers", Auth.verify, Course.getTaskAnswers);
router.post("/get-current-student-answer", Auth.verify, Course.getTaskAnswer);
router.post("/add-teacher-answer", Auth.verify, Course.addTeacherAnswer);

// Адаптивные тесты
router.post("/get-users-for-adaptive-test", Auth.verify, Course.getUsersForAdaptiveTest);
router.post("/delete-adaptive-test-question", Auth.verify, Course.deleteAdaptiveTestQuestion);
router.post("/get-adaptive-test-course-info", Auth.verify, Course.getAdaptiveTestCourseInfo);
router.post("/get-adaptive-test-students-info", Auth.verify, Course.getStudentsAdaptiveTestsInfo);
router.post("/get-adaptive-test-result", Auth.verify, Course.getAdaptiveTestResult);
router.post("/add-theme-for-adaptive-test", Auth.verify, Course.addThemeForAdaptiveTest)
router.post("/add-question-for-adaptive-test", Auth.verify, Course.addQuestionForAdaptiveTest)
router.post("/create-adaptive-test", Auth.verify, Course.createAdaptiveTest)
router.post("/get-adaptive-test-question", Auth.verify, Course.getAdaptiveTestQuestion)
router.post("/answer-adaptive-test-question", Auth.verify, Course.answerAdaptiveTestQuestion)

module.exports = router;

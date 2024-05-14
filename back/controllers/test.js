const connection = require("../connect");

class TestController {
    async getQuestions (req, res){
        try {
            const query = "SELECT * FROM questions";
            const result = await connection.query(query);
            return res.json(result.rows);
        } catch (err) {
            return res.json({msg: "Что-то пошло не так"});
        }
    }
    async getQuestion (req, res){

    }
    async postAnswer(req, res){

    }


}

module.exports = new TestController();
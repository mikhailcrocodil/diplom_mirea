function getToken(req) {
    return req.headers["authorization"] && req.headers["authorization"].split(" ")[0] === "Bearer" ?
        req.headers["authorization"].split(" ")[1] :
        false;
}

function notCorrectParamMessage(param) {
    return `Not correct params. Need '${param}'`;
}


module.exports = { getToken, notCorrectParamMessage };

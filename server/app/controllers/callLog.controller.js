const accountSid = process.env.TWILIOSID;
const authToken = process.env.TWILIOTOKEN;
const client = require("twilio")(accountSid, authToken);

exports.getExecutionlist = (req, res) => {
    client.studio.flows(req.body.flowSid)
        .executions
        .list({ limit: 20 })
        .then(executions => {
            return res.json({ "success": true, "message": "call fetched by number successfully", executions });
        });
};

exports.getUserInput = (req, res) => {
    client.studio.flows(req.body.flowSid)
        .executions(req.body.sid)
        .executionContext()
        .fetch()
        .then(executions => {
            return res.json({ "success": true, "message": "User Iput fetched successfully", executions });
        });
};
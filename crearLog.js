const fs = require("fs").promises;
async function addToLog(req){
    const logMessage = new Date().toISOString() +" "+ req.method + " " + req.url;
    await fs.appendFile("./log.txt", "{"+"log: '"+logMessage+"'}, ", "utf8");
    return true;
};
module.exports = {
    addToLog,
}
const schedule = require('node-schedule');
const moment = require("moment");
const recruitPost = require("../schemas/recruitPost");

module.exports = {
    schedule_job: () => {
        let rule = new schedule.RecurrenceRule();
        rule.hour = 24;
        schedule.scheduleJob(rule, async()=>{
            //매일 24시에 실행될 로직
            let today = new Date();
            console.log(today);
            const setRecruitPost = await recruitPost.find();
            const thistime = moment().add('9','h').format('YYYY-MM-DD');
            await recruitPost.updateMany({date: { $lt: thistime } }, { $set: { status:true }} )
            console.log(setRecruitPost);
        })
    }
}
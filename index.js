const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

module.exports.cleaner = (event, context, callback) => {
  let time = new Date();
  time = (time.getTime() / 1000) - (60 * 60 * 24 * process.env.MAX_AGE)
  web.files.list({ts_to: time })
    .then((res) => {
      console.log(res);
    })
    .catch(console.error);
}

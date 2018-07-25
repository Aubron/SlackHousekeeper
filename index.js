const { WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token, {
  retryConfig: {
    retries: 0,
  },
});

module.exports.cleaner = async (event, context, callback) => {
  let time = new Date();
  time = (time.getTime() / 1000) - (60 * 60 * 24 * parseInt(process.env.MAX_AGE))
  let totalPages = 1;
  let files = [];
  for (let i = 1; i <= totalPages; i += 1) {
    let result = await web.files.list({ts_to: time, page: i })
      .catch(console.error);
    files = files.concat(result.files);
    totalPages = result.paging.pages;
  }

  let fileCount = files.length;
  console.log('Attempting to delete ' + fileCount + ' files.');

  let promises = [];
  for (let i = 0; i < files.length; i += 1) {
    let file = files[i];
    promises.push(
      web.files.delete({file: file.id})
        .catch(console.error)
    );
  }

  await Promise.all(promises)
    .catch(console.error);

  if (process.env.SEND_NOTIFICATIONS === "true" && fileCount > 0) {
    let message = `Cleared ${fileCount} old files that were over ${process.env.MAX_AGE} days old. You're welcome.`
    web.chat.postMessage({ channel: process.env.NOTIFICATION_CHANNEL, text: message })
      .catch(console.error);
  }


}

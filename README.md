# SlackOfAllTrades

Serverless script to keep your slack files hitting the free limit.

## Instructions

1. `yarn install`
2. Copy config.example.json to config.json
3. [Edit config.json as needed.](https://github.com/Aubron/SlackOfAllTrades#configuration)
4. [Set up AWS credentials in your environment](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
4. `yarn deploy`
5. 🎉

## Local Development

1. (1-3 above)
2. Set the rate to 1 minute.
2. `yarn start`

## Configuration

config.json has a number of properties that will configure and customize the script.

| Property | Description |
|---------------------|----------------------------------------------------------|
| slackApiToken | API token retrieved from slack |
| region | AWS region |
| stackName | Generated CloudFormation Stack Name |
| lambdaName | Generated Lambda Name |
| lambdaDescription | Generated Lambda Description |
| memory | Memory Dedicated to Task (default 1024) |
| timeout | Timeout for Task in seconds (default 300) |
| rate | Rate at which the task runs ([in AWS Format](https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html)) |
| maxAge | Max age for ignored files in days (default 30) |
| sendNotifications | If true, notifications are sent to slack after each run in which files are deleted. |
| notificationChannel | Channel to post notifications to (can use # or @ syntax) |

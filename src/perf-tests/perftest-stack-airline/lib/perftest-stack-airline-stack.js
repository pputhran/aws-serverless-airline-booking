"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const aws_iam_1 = require("@aws-cdk/aws-iam");
const s3 = require("@aws-cdk/aws-s3");
const STACK_NAME = process.env.STACK_NAME;
const ROLE_NAME = `${STACK_NAME}-fargate-role`;
const VPC_NAME = `${STACK_NAME}-vpc`;
const CIDR_BLOCK = `198.162.0.0/24`;
const MAX_AZs = 2;
const ECR_GATLING_REPO_NAME = `${STACK_NAME}-gatling`;
const ECR_MOCKDATA_REPO_NAME = `${STACK_NAME}-mockdata`;
const ECS_CLUSTER = `${STACK_NAME}-cluster`;
const GATLING_FARGATE_TASK_DEF = `${STACK_NAME}-gatling-task-def`;
const MOCKDATA_FARGATE_TASK_DEF = `${STACK_NAME}-mockdata-task-def`;
const MEMORY_LIMIT = 2048;
const CPU = 1024;
const GATLING_CONTAINER_NAME = `${STACK_NAME}-gatling-container`;
const MOCKDATA_CONTAINER_NAME = `${STACK_NAME}-mockdata-container`;
const STATE_MACHINE_NAME = `loadtest-${STACK_NAME}`;
const S3_BUCKET_NAME = `${STACK_NAME}-loadtest`;
const BRANCH_NAME = process.env.AWS_BRANCH;
const FOLDERPATH = "./";
class PerftestStackAirlineStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // retrieving all environment variables
        const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION;
        const COGNITO_USER_POOL_ARN = process.env.COGNITO_USER_POOL_ARN || "not_defined";
        // const USER_POOL_ID = process.env.USER_POOL_ID || "not_defined"
        // const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID || "not_defined"
        // const COGNITO_URL = `https://cognito-idp.${AWS_DEFAULT_REGION}.amazonaws.com/`
        // const APPSYNC_URL = process.env.APPSYNC_URL || "not_defined"
        // const API_URL = process.env.API_URL || "not_defined"
        // const GRAPHQL_API_ID = process.env.GRAPHQL_API_ID || "not_defined"
        const role = new aws_iam_1.Role(this, ROLE_NAME, {
            roleName: ROLE_NAME,
            assumedBy: new aws_iam_1.ServicePrincipal('ecs-tasks.amazonaws.com')
        });
        const bucket = new s3.Bucket(this, "s3bucket", {
            bucketName: S3_BUCKET_NAME
        });
        role.addToPolicy(new aws_iam_1.PolicyStatement({
            resources: [
                `${bucket.bucketArn}`,
                `${bucket.bucketArn}/*`
            ],
            actions: [
                's3:PutObject',
                's3:GetObjectAcl',
                's3:GetObject',
                's3:ListBucket',
                's3:PutObjectAcl',
                's3:DeleteObject'
            ]
        }));
        role.addToPolicy(new aws_iam_1.PolicyStatement({
            resources: [`${COGNITO_USER_POOL_ARN}`],
            actions: [
                'cognito-idp:AdminInitiateAuth',
                'cognito-idp:AdminCreateUser',
                'cognito-idp:AdminSetUserPassword',
                'cognito-idp:UpdateUserPoolClient',
                'cognito-idp:AdminDeleteUser'
            ]
        }));
        // const vpc = new ec2.Vpc(this, VPC_NAME, {
        //   cidr: CIDR_BLOCK,
        //   maxAzs: MAX_AZs
        // })
        // const gatlingRepository = new ecr.Repository(this, ECR_GATLING_REPO_NAME, {
        //   repositoryName: ECR_GATLING_REPO_NAME
        // });
        // const mockDataRepository = new ecr.Repository(this, ECR_MOCKDATA_REPO_NAME, {
        //   repositoryName: ECR_MOCKDATA_REPO_NAME
        // });
        // const cluster = new ecs.Cluster(this, ECS_CLUSTER, {
        //   vpc: vpc,
        //   clusterName: ECS_CLUSTER
        // });
        // const gatlingTaskDefinition = new ecs.FargateTaskDefinition(this, GATLING_FARGATE_TASK_DEF, {
        //   family: GATLING_FARGATE_TASK_DEF,
        //   executionRole: role,
        //   taskRole: role,
        //   memoryLimitMiB: MEMORY_LIMIT,
        //   cpu: CPU
        // });
        // const mockDataTaskDefinition = new ecs.FargateTaskDefinition(this, MOCKDATA_FARGATE_TASK_DEF, {
        //   family: MOCKDATA_FARGATE_TASK_DEF,
        //   executionRole: role,
        //   taskRole: role,
        //   memoryLimitMiB: MEMORY_LIMIT,
        //   cpu: CPU
        // });
        // const gatlingLogging = new ecs.AwsLogDriver({
        //   logGroup: new LogGroup(this, GATLING_CONTAINER_NAME, {
        //     logGroupName: `/aws/ecs/${GATLING_CONTAINER_NAME}`,
        //     retention: RetentionDays.ONE_WEEK
        //   }),
        //   streamPrefix: "gatling"
        // })
        // const mockDatalogging = new ecs.AwsLogDriver({
        //   logGroup: new LogGroup(this, MOCKDATA_CONTAINER_NAME, {
        //     logGroupName: `/aws/ecs/${MOCKDATA_CONTAINER_NAME}`,
        //     retention: RetentionDays.ONE_WEEK
        //   }),
        //   streamPrefix: "mockdata"
        // })
        // const tokenCSV = ssm.StringParameter.valueForStringParameter(this, `/${BRANCH_NAME}/service/loadtest/csv/token`);
        // const userCSV = ssm.StringParameter.valueForStringParameter(this, `/${BRANCH_NAME}/service/loadtest/csv/user`);
        // const loadtestBucket = ssm.StringParameter.valueForStringParameter(this, `/${BRANCH_NAME}/service/s3/loadtest/bucket`);
        // const userPoolID = ssm.StringParameter.valueForStringParameter(this, `/${BRANCH_NAME}/service/amplify/auth/userpool/id`);
        // const cognitoClientID = ssm.StringParameter.valueForStringParameter(this, `/${BRANCH_NAME}/service/amplify/auth/userpool/clientId`);
        // const appsyncAPIKey = ssm.StringParameter.valueForStringParameter(this, `/${BRANCH_NAME}/service/amplify/api/id`)
        // const appsyncURL = ssm.StringParameter.valueForStringParameter(this, `/${BRANCH_NAME}/service/amplify/api/url`)
        // const cognitoURL = ssm.StringParameter.valueForStringParameter(this, `/${BRANCH_NAME}/service/auth/userpool/url`)
        // const apiURL = ssm.StringParameter.valueForStringParameter(this, `/${BRANCH_NAME}/service/payment/api/charge/url`)
        // const stripePublicKey = ssm.StringParameter.valueForStringParameter(this, `/${BRANCH_NAME}/service/payment/stripe/publicKey`)
        // const userCount = ssm.StringParameter.valueForStringParameter(this, `/${BRANCH_NAME}/service/loadtest/usercount`)
        // const duration = ssm.StringParameter.valueForStringParameter(this, `/${BRANCH_NAME}/service/loadtest/duration`)
        // // Create container from local `Dockerfile` for Gatling
        // const gatlingAppContainer = gatlingTaskDefinition.addContainer(GATLING_CONTAINER_NAME, {
        //   image: ecs.ContainerImage.fromEcrRepository(gatlingRepository),
        //   logging: gatlingLogging,
        //   environment: {
        //     "APPSYNC_URL": appsyncURL,
        //     "API_URL": apiURL,
        //     "COGNITO_URL": cognitoURL,
        //     "S3_BUCKET": loadtestBucket,
        //     "TOKEN_CSV": tokenCSV,
        //     "STRIPE_PUBLIC_KEY": stripePublicKey,
        //     "USER_COUNT": userCount,
        //     "DURATION": duration
        //   }
        // });
        // const mockDataAppContainer = mockDataTaskDefinition.addContainer(MOCKDATA_CONTAINER_NAME, {
        //   image: ecs.ContainerImage.fromEcrRepository(mockDataRepository),
        //   logging: mockDatalogging,
        //   environment: {
        //     "TOKEN_CSV": tokenCSV,
        //     "USER_CSV": userCSV,
        //     "AWS_REGION": `${AWS_DEFAULT_REGION}`,
        //     "S3_BUCKET": loadtestBucket,
        //     "USER_POOL_ID": userPoolID,
        //     "COGNITO_CLIENT_ID": cognitoClientID,
        //     "FOLDERPATH": FOLDERPATH,
        //     "APPSYNC_API_KEY": appsyncAPIKey,
        //     "APPSYNC_URL": appsyncURL
        //   }
        // });
        // // Step function for setting the load test
        // const setupUsers = new sfn.Task(this, "Setup Users", {
        //   task: new tasks.RunEcsFargateTask({
        //     cluster,
        //     taskDefinition: mockDataTaskDefinition,
        //     assignPublicIp: true,
        //     containerOverrides: [{
        //       containerName: mockDataAppContainer.containerName,
        //       command: Data.listAt('$.commands'),
        //       environment: [
        //         {
        //           name: 'setup-users',
        //           value: Context.taskToken
        //         }
        //       ]
        //     }],
        //     integrationPattern: ServiceIntegrationPattern.WAIT_FOR_TASK_TOKEN
        //   })
        // })
        // const loadFlights = new sfn.Task(this, "Load Flights", {
        //   task: new tasks.RunEcsFargateTask({
        //     cluster,
        //     taskDefinition: mockDataTaskDefinition,
        //     assignPublicIp: true,
        //     containerOverrides: [{
        //       containerName: mockDataAppContainer.containerName,
        //       command: Data.listAt('$.commands'),
        //       environment: [
        //         {
        //           name: 'load-flights',
        //           value: Context.taskToken
        //         }
        //       ]
        //     }],
        //     integrationPattern: ServiceIntegrationPattern.WAIT_FOR_TASK_TOKEN
        //   })
        // })
        // const runGatling = new sfn.Task(this, "Run Gatling", {
        //   task: new tasks.RunEcsFargateTask({
        //     cluster,
        //     taskDefinition: gatlingTaskDefinition,
        //     assignPublicIp: true,
        //     containerOverrides: [{
        //       containerName: gatlingAppContainer.containerName,
        //       command: Data.listAt('$.commands'),
        //       environment: [
        //         {
        //           name: 'run-gatling',
        //           value: Context.taskToken
        //         }
        //       ]
        //     }],
        //     integrationPattern: ServiceIntegrationPattern.WAIT_FOR_TASK_TOKEN
        //   })
        // })
        // const consolidateReport = new sfn.Task(this, "Consolidate Report", {
        //   task: new tasks.RunEcsFargateTask({
        //     cluster,
        //     taskDefinition: gatlingTaskDefinition,
        //     assignPublicIp: true,
        //     containerOverrides: [{
        //       containerName: gatlingAppContainer.containerName,
        //       command: Data.listAt('$.commands'),
        //       environment: [
        //         {
        //           name: 'consolidate-report',
        //           value: Context.taskToken
        //         }
        //       ]
        //     }],
        //     integrationPattern: ServiceIntegrationPattern.WAIT_FOR_TASK_TOKEN
        //   })
        // })
        // const cleanUp = new sfn.Task(this, "Clean Up", {
        //   task: new tasks.RunEcsFargateTask({
        //     cluster,
        //     taskDefinition: mockDataTaskDefinition,
        //     assignPublicIp: true,
        //     containerOverrides: [{
        //       containerName: mockDataAppContainer.containerName,
        //       command: Data.listAt('$.commands'),
        //       environment: [
        //         {
        //           name: 'clean-up',
        //           value: Context.taskToken
        //         }
        //       ]
        //     }],
        //     integrationPattern: ServiceIntegrationPattern.WAIT_FOR_TASK_TOKEN
        //   })
        // })
        // const stepfuncDefinition = setupUsers
        //   .next(loadFlights)
        //   .next(runGatling)
        //   .next(consolidateReport)
        //   .next(cleanUp)
        // const loadtestsfn = new sfn.StateMachine(this, STATE_MACHINE_NAME, {
        //   stateMachineName: STATE_MACHINE_NAME,
        //   definition: stepfuncDefinition
        // })
        // const ecsLambda = new lambda.Function(this, "ecstasklambda", {
        //   runtime: lambda.Runtime.NODEJS_10_X,
        //   handler: "index.handler",
        //   code: new lambda.AssetCode("lambda"),
        //   functionName: `${STACK_NAME}-ecs-task-change`
        // })
        // ecsLambda.addToRolePolicy(new PolicyStatement({
        //   actions: ["states:SendTaskSuccess"],
        //   resources: [loadtestsfn.stateMachineArn]
        // }))
        // const cwRule = new Rule(this, "cw-rule", {
        //   description: "Rule that looks at ECS Task change state and triggers Lambda function",
        //   enabled: true,
        //   ruleName: "ECS-task-change-cdk",
        //   targets: [
        //   ]
        // })
        // cwRule.addEventPattern({
        //   source: ['aws.ecs'],
        //   detailType: ["ECS Task State Change"],
        //   detail: {
        //     clusterArn: [cluster.clusterArn],
        //     lastStatus: ["STOPPED"]
        //   }
        // })
        // cwRule.addTarget(new targets.LambdaFunction(ecsLambda))
    }
}
exports.PerftestStackAirlineStack = PerftestStackAirlineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZnRlc3Qtc3RhY2stYWlybGluZS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBlcmZ0ZXN0LXN0YWNrLWFpcmxpbmUtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBc0M7QUFJdEMsOENBQTJFO0FBSzNFLHNDQUF1QztBQU12QyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUMxQyxNQUFNLFNBQVMsR0FBRyxHQUFHLFVBQVUsZUFBZSxDQUFDO0FBQy9DLE1BQU0sUUFBUSxHQUFHLEdBQUcsVUFBVSxNQUFNLENBQUM7QUFDckMsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUM7QUFDcEMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFBO0FBQ2pCLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxVQUFVLFVBQVUsQ0FBQTtBQUNyRCxNQUFNLHNCQUFzQixHQUFHLEdBQUcsVUFBVSxXQUFXLENBQUE7QUFDdkQsTUFBTSxXQUFXLEdBQUcsR0FBRyxVQUFVLFVBQVUsQ0FBQTtBQUMzQyxNQUFNLHdCQUF3QixHQUFHLEdBQUcsVUFBVSxtQkFBbUIsQ0FBQTtBQUNqRSxNQUFNLHlCQUF5QixHQUFHLEdBQUcsVUFBVSxvQkFBb0IsQ0FBQTtBQUNuRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUE7QUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFBO0FBQ2hCLE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxVQUFVLG9CQUFvQixDQUFBO0FBQ2hFLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxVQUFVLHFCQUFxQixDQUFBO0FBQ2xFLE1BQU0sa0JBQWtCLEdBQUcsWUFBWSxVQUFVLEVBQUUsQ0FBQTtBQUNuRCxNQUFNLGNBQWMsR0FBRyxHQUFHLFVBQVUsV0FBVyxDQUFBO0FBQy9DLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFBO0FBQzFDLE1BQU0sVUFBVSxHQUFH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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjZGsgPSByZXF1aXJlKCdAYXdzLWNkay9jb3JlJyk7XG5pbXBvcnQgZWMyID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWVjMicpXG5pbXBvcnQgZWNzID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWVjcycpXG5pbXBvcnQgZWNyID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWVjcicpXG5pbXBvcnQgeyBSb2xlLCBTZXJ2aWNlUHJpbmNpcGFsLCBQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tICdAYXdzLWNkay9hd3MtaWFtJztcbmltcG9ydCBzZm4gPSByZXF1aXJlKCdAYXdzLWNkay9hd3Mtc3RlcGZ1bmN0aW9ucycpO1xuaW1wb3J0IHRhc2tzID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLXN0ZXBmdW5jdGlvbnMtdGFza3MnKTtcbmltcG9ydCB7IExvZ0dyb3VwLCBSZXRlbnRpb25EYXlzIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWxvZ3MnO1xuaW1wb3J0IHsgRGF0YSwgU2VydmljZUludGVncmF0aW9uUGF0dGVybiwgQ29udGV4dCB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1zdGVwZnVuY3Rpb25zJztcbmltcG9ydCBzMyA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1zMycpO1xuaW1wb3J0IHsgUnVsZSB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1ldmVudHMnO1xuaW1wb3J0IGxhbWJkYSA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnKVxuaW1wb3J0IHRhcmdldHMgPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtZXZlbnRzLXRhcmdldHMnKVxuaW1wb3J0IHNzbSA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1zc20nKTtcblxuY29uc3QgU1RBQ0tfTkFNRSA9IHByb2Nlc3MuZW52LlNUQUNLX05BTUU7XG5jb25zdCBST0xFX05BTUUgPSBgJHtTVEFDS19OQU1FfS1mYXJnYXRlLXJvbGVgO1xuY29uc3QgVlBDX05BTUUgPSBgJHtTVEFDS19OQU1FfS12cGNgO1xuY29uc3QgQ0lEUl9CTE9DSyA9IGAxOTguMTYyLjAuMC8yNGA7XG5jb25zdCBNQVhfQVpzID0gMlxuY29uc3QgRUNSX0dBVExJTkdfUkVQT19OQU1FID0gYCR7U1RBQ0tfTkFNRX0tZ2F0bGluZ2BcbmNvbnN0IEVDUl9NT0NLREFUQV9SRVBPX05BTUUgPSBgJHtTVEFDS19OQU1FfS1tb2NrZGF0YWBcbmNvbnN0IEVDU19DTFVTVEVSID0gYCR7U1RBQ0tfTkFNRX0tY2x1c3RlcmBcbmNvbnN0IEdBVExJTkdfRkFSR0FURV9UQVNLX0RFRiA9IGAke1NUQUNLX05BTUV9LWdhdGxpbmctdGFzay1kZWZgXG5jb25zdCBNT0NLREFUQV9GQVJHQVRFX1RBU0tfREVGID0gYCR7U1RBQ0tfTkFNRX0tbW9ja2RhdGEtdGFzay1kZWZgXG5jb25zdCBNRU1PUllfTElNSVQgPSAyMDQ4XG5jb25zdCBDUFUgPSAxMDI0XG5jb25zdCBHQVRMSU5HX0NPTlRBSU5FUl9OQU1FID0gYCR7U1RBQ0tfTkFNRX0tZ2F0bGluZy1jb250YWluZXJgXG5jb25zdCBNT0NLREFUQV9DT05UQUlORVJfTkFNRSA9IGAke1NUQUNLX05BTUV9LW1vY2tkYXRhLWNvbnRhaW5lcmBcbmNvbnN0IFNUQVRFX01BQ0hJTkVfTkFNRSA9IGBsb2FkdGVzdC0ke1NUQUNLX05BTUV9YFxuY29uc3QgUzNfQlVDS0VUX05BTUUgPSBgJHtTVEFDS19OQU1FfS1sb2FkdGVzdGBcbmNvbnN0IEJSQU5DSF9OQU1FID0gcHJvY2Vzcy5lbnYuQVdTX0JSQU5DSFxuY29uc3QgRk9MREVSUEFUSCA9IFwiLi9cIlxuXG5leHBvcnQgY2xhc3MgUGVyZnRlc3RTdGFja0FpcmxpbmVTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQXBwLCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyByZXRyaWV2aW5nIGFsbCBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbiAgICBjb25zdCBBV1NfREVGQVVMVF9SRUdJT04gPSBwcm9jZXNzLmVudi5BV1NfREVGQVVMVF9SRUdJT05cbiAgICBjb25zdCBDT0dOSVRPX1VTRVJfUE9PTF9BUk4gPSBwcm9jZXNzLmVudi5DT0dOSVRPX1VTRVJfUE9PTF9BUk4gfHwgXCJub3RfZGVmaW5lZFwiXG4gICAgLy8gY29uc3QgVVNFUl9QT09MX0lEID0gcHJvY2Vzcy5lbnYuVVNFUl9QT09MX0lEIHx8IFwibm90X2RlZmluZWRcIlxuICAgIC8vIGNvbnN0IENPR05JVE9fQ0xJRU5UX0lEID0gcHJvY2Vzcy5lbnYuQ09HTklUT19DTElFTlRfSUQgfHwgXCJub3RfZGVmaW5lZFwiXG4gICAgLy8gY29uc3QgQ09HTklUT19VUkwgPSBgaHR0cHM6Ly9jb2duaXRvLWlkcC4ke0FXU19ERUZBVUxUX1JFR0lPTn0uYW1hem9uYXdzLmNvbS9gXG4gICAgLy8gY29uc3QgQVBQU1lOQ19VUkwgPSBwcm9jZXNzLmVudi5BUFBTWU5DX1VSTCB8fCBcIm5vdF9kZWZpbmVkXCJcbiAgICAvLyBjb25zdCBBUElfVVJMID0gcHJvY2Vzcy5lbnYuQVBJX1VSTCB8fCBcIm5vdF9kZWZpbmVkXCJcbiAgICAvLyBjb25zdCBHUkFQSFFMX0FQSV9JRCA9IHByb2Nlc3MuZW52LkdSQVBIUUxfQVBJX0lEIHx8IFwibm90X2RlZmluZWRcIlxuXG4gICAgY29uc3Qgcm9sZSA9IG5ldyBSb2xlKHRoaXMsIFJPTEVfTkFNRSwge1xuICAgICAgcm9sZU5hbWU6IFJPTEVfTkFNRSxcbiAgICAgIGFzc3VtZWRCeTogbmV3IFNlcnZpY2VQcmluY2lwYWwoJ2Vjcy10YXNrcy5hbWF6b25hd3MuY29tJylcbiAgICB9KVxuXG4gICAgY29uc3QgYnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCBcInMzYnVja2V0XCIsIHtcbiAgICAgIGJ1Y2tldE5hbWU6IFMzX0JVQ0tFVF9OQU1FXG4gICAgfSlcblxuICAgIHJvbGUuYWRkVG9Qb2xpY3kobmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgYCR7YnVja2V0LmJ1Y2tldEFybn1gLFxuICAgICAgICBgJHtidWNrZXQuYnVja2V0QXJufS8qYFxuICAgICAgXSxcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgJ3MzOlB1dE9iamVjdCcsXG4gICAgICAgICdzMzpHZXRPYmplY3RBY2wnLFxuICAgICAgICAnczM6R2V0T2JqZWN0JyxcbiAgICAgICAgJ3MzOkxpc3RCdWNrZXQnLFxuICAgICAgICAnczM6UHV0T2JqZWN0QWNsJyxcbiAgICAgICAgJ3MzOkRlbGV0ZU9iamVjdCdcbiAgICAgIF1cbiAgICB9KSlcblxuICAgIHJvbGUuYWRkVG9Qb2xpY3kobmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICByZXNvdXJjZXM6IFtgJHtDT0dOSVRPX1VTRVJfUE9PTF9BUk59YF0sXG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgICdjb2duaXRvLWlkcDpBZG1pbkluaXRpYXRlQXV0aCcsXG4gICAgICAgICdjb2duaXRvLWlkcDpBZG1pbkNyZWF0ZVVzZXInLFxuICAgICAgICAnY29nbml0by1pZHA6QWRtaW5TZXRVc2VyUGFzc3dvcmQnLFxuICAgICAgICAnY29nbml0by1pZHA6VXBkYXRlVXNlclBvb2xDbGllbnQnLFxuICAgICAgICAnY29nbml0by1pZHA6QWRtaW5EZWxldGVVc2VyJ1xuICAgICAgXVxuICAgIH0pKVxuXG4gICAgLy8gY29uc3QgdnBjID0gbmV3IGVjMi5WcGModGhpcywgVlBDX05BTUUsIHtcbiAgICAvLyAgIGNpZHI6IENJRFJfQkxPQ0ssXG4gICAgLy8gICBtYXhBenM6IE1BWF9BWnNcbiAgICAvLyB9KVxuXG5cbiAgICAvLyBjb25zdCBnYXRsaW5nUmVwb3NpdG9yeSA9IG5ldyBlY3IuUmVwb3NpdG9yeSh0aGlzLCBFQ1JfR0FUTElOR19SRVBPX05BTUUsIHtcbiAgICAvLyAgIHJlcG9zaXRvcnlOYW1lOiBFQ1JfR0FUTElOR19SRVBPX05BTUVcbiAgICAvLyB9KTtcblxuICAgIC8vIGNvbnN0IG1vY2tEYXRhUmVwb3NpdG9yeSA9IG5ldyBlY3IuUmVwb3NpdG9yeSh0aGlzLCBFQ1JfTU9DS0RBVEFfUkVQT19OQU1FLCB7XG4gICAgLy8gICByZXBvc2l0b3J5TmFtZTogRUNSX01PQ0tEQVRBX1JFUE9fTkFNRVxuICAgIC8vIH0pO1xuXG4gICAgLy8gY29uc3QgY2x1c3RlciA9IG5ldyBlY3MuQ2x1c3Rlcih0aGlzLCBFQ1NfQ0xVU1RFUiwge1xuICAgIC8vICAgdnBjOiB2cGMsXG4gICAgLy8gICBjbHVzdGVyTmFtZTogRUNTX0NMVVNURVJcbiAgICAvLyB9KTtcblxuICAgIC8vIGNvbnN0IGdhdGxpbmdUYXNrRGVmaW5pdGlvbiA9IG5ldyBlY3MuRmFyZ2F0ZVRhc2tEZWZpbml0aW9uKHRoaXMsIEdBVExJTkdfRkFSR0FURV9UQVNLX0RFRiwge1xuICAgIC8vICAgZmFtaWx5OiBHQVRMSU5HX0ZBUkdBVEVfVEFTS19ERUYsXG4gICAgLy8gICBleGVjdXRpb25Sb2xlOiByb2xlLFxuICAgIC8vICAgdGFza1JvbGU6IHJvbGUsXG4gICAgLy8gICBtZW1vcnlMaW1pdE1pQjogTUVNT1JZX0xJTUlULFxuICAgIC8vICAgY3B1OiBDUFVcbiAgICAvLyB9KTtcblxuICAgIC8vIGNvbnN0IG1vY2tEYXRhVGFza0RlZmluaXRpb24gPSBuZXcgZWNzLkZhcmdhdGVUYXNrRGVmaW5pdGlvbih0aGlzLCBNT0NLREFUQV9GQVJHQVRFX1RBU0tfREVGLCB7XG4gICAgLy8gICBmYW1pbHk6IE1PQ0tEQVRBX0ZBUkdBVEVfVEFTS19ERUYsXG4gICAgLy8gICBleGVjdXRpb25Sb2xlOiByb2xlLFxuICAgIC8vICAgdGFza1JvbGU6IHJvbGUsXG4gICAgLy8gICBtZW1vcnlMaW1pdE1pQjogTUVNT1JZX0xJTUlULFxuICAgIC8vICAgY3B1OiBDUFVcbiAgICAvLyB9KTtcblxuICAgIC8vIGNvbnN0IGdhdGxpbmdMb2dnaW5nID0gbmV3IGVjcy5Bd3NMb2dEcml2ZXIoe1xuICAgIC8vICAgbG9nR3JvdXA6IG5ldyBMb2dHcm91cCh0aGlzLCBHQVRMSU5HX0NPTlRBSU5FUl9OQU1FLCB7XG4gICAgLy8gICAgIGxvZ0dyb3VwTmFtZTogYC9hd3MvZWNzLyR7R0FUTElOR19DT05UQUlORVJfTkFNRX1gLFxuICAgIC8vICAgICByZXRlbnRpb246IFJldGVudGlvbkRheXMuT05FX1dFRUtcbiAgICAvLyAgIH0pLFxuICAgIC8vICAgc3RyZWFtUHJlZml4OiBcImdhdGxpbmdcIlxuICAgIC8vIH0pXG5cbiAgICAvLyBjb25zdCBtb2NrRGF0YWxvZ2dpbmcgPSBuZXcgZWNzLkF3c0xvZ0RyaXZlcih7XG4gICAgLy8gICBsb2dHcm91cDogbmV3IExvZ0dyb3VwKHRoaXMsIE1PQ0tEQVRBX0NPTlRBSU5FUl9OQU1FLCB7XG4gICAgLy8gICAgIGxvZ0dyb3VwTmFtZTogYC9hd3MvZWNzLyR7TU9DS0RBVEFfQ09OVEFJTkVSX05BTUV9YCxcbiAgICAvLyAgICAgcmV0ZW50aW9uOiBSZXRlbnRpb25EYXlzLk9ORV9XRUVLXG4gICAgLy8gICB9KSxcbiAgICAvLyAgIHN0cmVhbVByZWZpeDogXCJtb2NrZGF0YVwiXG4gICAgLy8gfSlcblxuICAgIC8vIGNvbnN0IHRva2VuQ1NWID0gc3NtLlN0cmluZ1BhcmFtZXRlci52YWx1ZUZvclN0cmluZ1BhcmFtZXRlcih0aGlzLCBgLyR7QlJBTkNIX05BTUV9L3NlcnZpY2UvbG9hZHRlc3QvY3N2L3Rva2VuYCk7XG4gICAgLy8gY29uc3QgdXNlckNTViA9IHNzbS5TdHJpbmdQYXJhbWV0ZXIudmFsdWVGb3JTdHJpbmdQYXJhbWV0ZXIodGhpcywgYC8ke0JSQU5DSF9OQU1FfS9zZXJ2aWNlL2xvYWR0ZXN0L2Nzdi91c2VyYCk7XG4gICAgLy8gY29uc3QgbG9hZHRlc3RCdWNrZXQgPSBzc20uU3RyaW5nUGFyYW1ldGVyLnZhbHVlRm9yU3RyaW5nUGFyYW1ldGVyKHRoaXMsIGAvJHtCUkFOQ0hfTkFNRX0vc2VydmljZS9zMy9sb2FkdGVzdC9idWNrZXRgKTtcbiAgICAvLyBjb25zdCB1c2VyUG9vbElEID0gc3NtLlN0cmluZ1BhcmFtZXRlci52YWx1ZUZvclN0cmluZ1BhcmFtZXRlcih0aGlzLCBgLyR7QlJBTkNIX05BTUV9L3NlcnZpY2UvYW1wbGlmeS9hdXRoL3VzZXJwb29sL2lkYCk7XG4gICAgLy8gY29uc3QgY29nbml0b0NsaWVudElEID0gc3NtLlN0cmluZ1BhcmFtZXRlci52YWx1ZUZvclN0cmluZ1BhcmFtZXRlcih0aGlzLCBgLyR7QlJBTkNIX05BTUV9L3NlcnZpY2UvYW1wbGlmeS9hdXRoL3VzZXJwb29sL2NsaWVudElkYCk7XG4gICAgLy8gY29uc3QgYXBwc3luY0FQSUtleSA9IHNzbS5TdHJpbmdQYXJhbWV0ZXIudmFsdWVGb3JTdHJpbmdQYXJhbWV0ZXIodGhpcywgYC8ke0JSQU5DSF9OQU1FfS9zZXJ2aWNlL2FtcGxpZnkvYXBpL2lkYClcbiAgICAvLyBjb25zdCBhcHBzeW5jVVJMID0gc3NtLlN0cmluZ1BhcmFtZXRlci52YWx1ZUZvclN0cmluZ1BhcmFtZXRlcih0aGlzLCBgLyR7QlJBTkNIX05BTUV9L3NlcnZpY2UvYW1wbGlmeS9hcGkvdXJsYClcbiAgICAvLyBjb25zdCBjb2duaXRvVVJMID0gc3NtLlN0cmluZ1BhcmFtZXRlci52YWx1ZUZvclN0cmluZ1BhcmFtZXRlcih0aGlzLCBgLyR7QlJBTkNIX05BTUV9L3NlcnZpY2UvYXV0aC91c2VycG9vbC91cmxgKVxuICAgIC8vIGNvbnN0IGFwaVVSTCA9IHNzbS5TdHJpbmdQYXJhbWV0ZXIudmFsdWVGb3JTdHJpbmdQYXJhbWV0ZXIodGhpcywgYC8ke0JSQU5DSF9OQU1FfS9zZXJ2aWNlL3BheW1lbnQvYXBpL2NoYXJnZS91cmxgKVxuICAgIC8vIGNvbnN0IHN0cmlwZVB1YmxpY0tleSA9IHNzbS5TdHJpbmdQYXJhbWV0ZXIudmFsdWVGb3JTdHJpbmdQYXJhbWV0ZXIodGhpcywgYC8ke0JSQU5DSF9OQU1FfS9zZXJ2aWNlL3BheW1lbnQvc3RyaXBlL3B1YmxpY0tleWApXG4gICAgLy8gY29uc3QgdXNlckNvdW50ID0gc3NtLlN0cmluZ1BhcmFtZXRlci52YWx1ZUZvclN0cmluZ1BhcmFtZXRlcih0aGlzLCBgLyR7QlJBTkNIX05BTUV9L3NlcnZpY2UvbG9hZHRlc3QvdXNlcmNvdW50YClcbiAgICAvLyBjb25zdCBkdXJhdGlvbiA9IHNzbS5TdHJpbmdQYXJhbWV0ZXIudmFsdWVGb3JTdHJpbmdQYXJhbWV0ZXIodGhpcywgYC8ke0JSQU5DSF9OQU1FfS9zZXJ2aWNlL2xvYWR0ZXN0L2R1cmF0aW9uYClcblxuICAgIC8vIC8vIENyZWF0ZSBjb250YWluZXIgZnJvbSBsb2NhbCBgRG9ja2VyZmlsZWAgZm9yIEdhdGxpbmdcbiAgICAvLyBjb25zdCBnYXRsaW5nQXBwQ29udGFpbmVyID0gZ2F0bGluZ1Rhc2tEZWZpbml0aW9uLmFkZENvbnRhaW5lcihHQVRMSU5HX0NPTlRBSU5FUl9OQU1FLCB7XG4gICAgLy8gICBpbWFnZTogZWNzLkNvbnRhaW5lckltYWdlLmZyb21FY3JSZXBvc2l0b3J5KGdhdGxpbmdSZXBvc2l0b3J5KSxcbiAgICAvLyAgIGxvZ2dpbmc6IGdhdGxpbmdMb2dnaW5nLFxuICAgIC8vICAgZW52aXJvbm1lbnQ6IHtcbiAgICAvLyAgICAgXCJBUFBTWU5DX1VSTFwiOiBhcHBzeW5jVVJMLFxuICAgIC8vICAgICBcIkFQSV9VUkxcIjogYXBpVVJMLFxuICAgIC8vICAgICBcIkNPR05JVE9fVVJMXCI6IGNvZ25pdG9VUkwsXG4gICAgLy8gICAgIFwiUzNfQlVDS0VUXCI6IGxvYWR0ZXN0QnVja2V0LFxuICAgIC8vICAgICBcIlRPS0VOX0NTVlwiOiB0b2tlbkNTVixcbiAgICAvLyAgICAgXCJTVFJJUEVfUFVCTElDX0tFWVwiOiBzdHJpcGVQdWJsaWNLZXksXG4gICAgLy8gICAgIFwiVVNFUl9DT1VOVFwiOiB1c2VyQ291bnQsXG4gICAgLy8gICAgIFwiRFVSQVRJT05cIjogZHVyYXRpb25cbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcblxuICAgIC8vIGNvbnN0IG1vY2tEYXRhQXBwQ29udGFpbmVyID0gbW9ja0RhdGFUYXNrRGVmaW5pdGlvbi5hZGRDb250YWluZXIoTU9DS0RBVEFfQ09OVEFJTkVSX05BTUUsIHtcbiAgICAvLyAgIGltYWdlOiBlY3MuQ29udGFpbmVySW1hZ2UuZnJvbUVjclJlcG9zaXRvcnkobW9ja0RhdGFSZXBvc2l0b3J5KSxcbiAgICAvLyAgIGxvZ2dpbmc6IG1vY2tEYXRhbG9nZ2luZyxcbiAgICAvLyAgIGVudmlyb25tZW50OiB7XG4gICAgLy8gICAgIFwiVE9LRU5fQ1NWXCI6IHRva2VuQ1NWLFxuICAgIC8vICAgICBcIlVTRVJfQ1NWXCI6IHVzZXJDU1YsXG4gICAgLy8gICAgIFwiQVdTX1JFR0lPTlwiOiBgJHtBV1NfREVGQVVMVF9SRUdJT059YCxcbiAgICAvLyAgICAgXCJTM19CVUNLRVRcIjogbG9hZHRlc3RCdWNrZXQsXG4gICAgLy8gICAgIFwiVVNFUl9QT09MX0lEXCI6IHVzZXJQb29sSUQsXG4gICAgLy8gICAgIFwiQ09HTklUT19DTElFTlRfSURcIjogY29nbml0b0NsaWVudElELFxuICAgIC8vICAgICBcIkZPTERFUlBBVEhcIjogRk9MREVSUEFUSCxcbiAgICAvLyAgICAgXCJBUFBTWU5DX0FQSV9LRVlcIjogYXBwc3luY0FQSUtleSxcbiAgICAvLyAgICAgXCJBUFBTWU5DX1VSTFwiOiBhcHBzeW5jVVJMXG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG5cbiAgICAvLyAvLyBTdGVwIGZ1bmN0aW9uIGZvciBzZXR0aW5nIHRoZSBsb2FkIHRlc3RcbiAgICAvLyBjb25zdCBzZXR1cFVzZXJzID0gbmV3IHNmbi5UYXNrKHRoaXMsIFwiU2V0dXAgVXNlcnNcIiwge1xuICAgIC8vICAgdGFzazogbmV3IHRhc2tzLlJ1bkVjc0ZhcmdhdGVUYXNrKHtcbiAgICAvLyAgICAgY2x1c3RlcixcbiAgICAvLyAgICAgdGFza0RlZmluaXRpb246IG1vY2tEYXRhVGFza0RlZmluaXRpb24sXG4gICAgLy8gICAgIGFzc2lnblB1YmxpY0lwOiB0cnVlLFxuICAgIC8vICAgICBjb250YWluZXJPdmVycmlkZXM6IFt7XG4gICAgLy8gICAgICAgY29udGFpbmVyTmFtZTogbW9ja0RhdGFBcHBDb250YWluZXIuY29udGFpbmVyTmFtZSxcbiAgICAvLyAgICAgICBjb21tYW5kOiBEYXRhLmxpc3RBdCgnJC5jb21tYW5kcycpLFxuICAgIC8vICAgICAgIGVudmlyb25tZW50OiBbXG4gICAgLy8gICAgICAgICB7XG4gICAgLy8gICAgICAgICAgIG5hbWU6ICdzZXR1cC11c2VycycsXG4gICAgLy8gICAgICAgICAgIHZhbHVlOiBDb250ZXh0LnRhc2tUb2tlblxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgIF1cbiAgICAvLyAgICAgfV0sXG4gICAgLy8gICAgIGludGVncmF0aW9uUGF0dGVybjogU2VydmljZUludGVncmF0aW9uUGF0dGVybi5XQUlUX0ZPUl9UQVNLX1RPS0VOXG4gICAgLy8gICB9KVxuICAgIC8vIH0pXG5cbiAgICAvLyBjb25zdCBsb2FkRmxpZ2h0cyA9IG5ldyBzZm4uVGFzayh0aGlzLCBcIkxvYWQgRmxpZ2h0c1wiLCB7XG4gICAgLy8gICB0YXNrOiBuZXcgdGFza3MuUnVuRWNzRmFyZ2F0ZVRhc2soe1xuICAgIC8vICAgICBjbHVzdGVyLFxuICAgIC8vICAgICB0YXNrRGVmaW5pdGlvbjogbW9ja0RhdGFUYXNrRGVmaW5pdGlvbixcbiAgICAvLyAgICAgYXNzaWduUHVibGljSXA6IHRydWUsXG4gICAgLy8gICAgIGNvbnRhaW5lck92ZXJyaWRlczogW3tcbiAgICAvLyAgICAgICBjb250YWluZXJOYW1lOiBtb2NrRGF0YUFwcENvbnRhaW5lci5jb250YWluZXJOYW1lLFxuICAgIC8vICAgICAgIGNvbW1hbmQ6IERhdGEubGlzdEF0KCckLmNvbW1hbmRzJyksXG4gICAgLy8gICAgICAgZW52aXJvbm1lbnQ6IFtcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgbmFtZTogJ2xvYWQtZmxpZ2h0cycsXG4gICAgLy8gICAgICAgICAgIHZhbHVlOiBDb250ZXh0LnRhc2tUb2tlblxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgIF1cbiAgICAvLyAgICAgfV0sXG4gICAgLy8gICAgIGludGVncmF0aW9uUGF0dGVybjogU2VydmljZUludGVncmF0aW9uUGF0dGVybi5XQUlUX0ZPUl9UQVNLX1RPS0VOXG4gICAgLy8gICB9KVxuICAgIC8vIH0pXG5cbiAgICAvLyBjb25zdCBydW5HYXRsaW5nID0gbmV3IHNmbi5UYXNrKHRoaXMsIFwiUnVuIEdhdGxpbmdcIiwge1xuICAgIC8vICAgdGFzazogbmV3IHRhc2tzLlJ1bkVjc0ZhcmdhdGVUYXNrKHtcbiAgICAvLyAgICAgY2x1c3RlcixcbiAgICAvLyAgICAgdGFza0RlZmluaXRpb246IGdhdGxpbmdUYXNrRGVmaW5pdGlvbixcbiAgICAvLyAgICAgYXNzaWduUHVibGljSXA6IHRydWUsXG4gICAgLy8gICAgIGNvbnRhaW5lck92ZXJyaWRlczogW3tcbiAgICAvLyAgICAgICBjb250YWluZXJOYW1lOiBnYXRsaW5nQXBwQ29udGFpbmVyLmNvbnRhaW5lck5hbWUsXG4gICAgLy8gICAgICAgY29tbWFuZDogRGF0YS5saXN0QXQoJyQuY29tbWFuZHMnKSxcbiAgICAvLyAgICAgICBlbnZpcm9ubWVudDogW1xuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICBuYW1lOiAncnVuLWdhdGxpbmcnLFxuICAgIC8vICAgICAgICAgICB2YWx1ZTogQ29udGV4dC50YXNrVG9rZW5cbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICBdXG4gICAgLy8gICAgIH1dLFxuICAgIC8vICAgICBpbnRlZ3JhdGlvblBhdHRlcm46IFNlcnZpY2VJbnRlZ3JhdGlvblBhdHRlcm4uV0FJVF9GT1JfVEFTS19UT0tFTlxuICAgIC8vICAgfSlcbiAgICAvLyB9KVxuXG4gICAgLy8gY29uc3QgY29uc29saWRhdGVSZXBvcnQgPSBuZXcgc2ZuLlRhc2sodGhpcywgXCJDb25zb2xpZGF0ZSBSZXBvcnRcIiwge1xuICAgIC8vICAgdGFzazogbmV3IHRhc2tzLlJ1bkVjc0ZhcmdhdGVUYXNrKHtcbiAgICAvLyAgICAgY2x1c3RlcixcbiAgICAvLyAgICAgdGFza0RlZmluaXRpb246IGdhdGxpbmdUYXNrRGVmaW5pdGlvbixcbiAgICAvLyAgICAgYXNzaWduUHVibGljSXA6IHRydWUsXG4gICAgLy8gICAgIGNvbnRhaW5lck92ZXJyaWRlczogW3tcbiAgICAvLyAgICAgICBjb250YWluZXJOYW1lOiBnYXRsaW5nQXBwQ29udGFpbmVyLmNvbnRhaW5lck5hbWUsXG4gICAgLy8gICAgICAgY29tbWFuZDogRGF0YS5saXN0QXQoJyQuY29tbWFuZHMnKSxcbiAgICAvLyAgICAgICBlbnZpcm9ubWVudDogW1xuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICBuYW1lOiAnY29uc29saWRhdGUtcmVwb3J0JyxcbiAgICAvLyAgICAgICAgICAgdmFsdWU6IENvbnRleHQudGFza1Rva2VuXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgXVxuICAgIC8vICAgICB9XSxcbiAgICAvLyAgICAgaW50ZWdyYXRpb25QYXR0ZXJuOiBTZXJ2aWNlSW50ZWdyYXRpb25QYXR0ZXJuLldBSVRfRk9SX1RBU0tfVE9LRU5cbiAgICAvLyAgIH0pXG4gICAgLy8gfSlcblxuICAgIC8vIGNvbnN0IGNsZWFuVXAgPSBuZXcgc2ZuLlRhc2sodGhpcywgXCJDbGVhbiBVcFwiLCB7XG4gICAgLy8gICB0YXNrOiBuZXcgdGFza3MuUnVuRWNzRmFyZ2F0ZVRhc2soe1xuICAgIC8vICAgICBjbHVzdGVyLFxuICAgIC8vICAgICB0YXNrRGVmaW5pdGlvbjogbW9ja0RhdGFUYXNrRGVmaW5pdGlvbixcbiAgICAvLyAgICAgYXNzaWduUHVibGljSXA6IHRydWUsXG4gICAgLy8gICAgIGNvbnRhaW5lck92ZXJyaWRlczogW3tcbiAgICAvLyAgICAgICBjb250YWluZXJOYW1lOiBtb2NrRGF0YUFwcENvbnRhaW5lci5jb250YWluZXJOYW1lLFxuICAgIC8vICAgICAgIGNvbW1hbmQ6IERhdGEubGlzdEF0KCckLmNvbW1hbmRzJyksXG4gICAgLy8gICAgICAgZW52aXJvbm1lbnQ6IFtcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgbmFtZTogJ2NsZWFuLXVwJyxcbiAgICAvLyAgICAgICAgICAgdmFsdWU6IENvbnRleHQudGFza1Rva2VuXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgXVxuICAgIC8vICAgICB9XSxcbiAgICAvLyAgICAgaW50ZWdyYXRpb25QYXR0ZXJuOiBTZXJ2aWNlSW50ZWdyYXRpb25QYXR0ZXJuLldBSVRfRk9SX1RBU0tfVE9LRU5cbiAgICAvLyAgIH0pXG4gICAgLy8gfSlcblxuICAgIC8vIGNvbnN0IHN0ZXBmdW5jRGVmaW5pdGlvbiA9IHNldHVwVXNlcnNcbiAgICAvLyAgIC5uZXh0KGxvYWRGbGlnaHRzKVxuICAgIC8vICAgLm5leHQocnVuR2F0bGluZylcbiAgICAvLyAgIC5uZXh0KGNvbnNvbGlkYXRlUmVwb3J0KVxuICAgIC8vICAgLm5leHQoY2xlYW5VcClcblxuICAgIC8vIGNvbnN0IGxvYWR0ZXN0c2ZuID0gbmV3IHNmbi5TdGF0ZU1hY2hpbmUodGhpcywgU1RBVEVfTUFDSElORV9OQU1FLCB7XG4gICAgLy8gICBzdGF0ZU1hY2hpbmVOYW1lOiBTVEFURV9NQUNISU5FX05BTUUsXG4gICAgLy8gICBkZWZpbml0aW9uOiBzdGVwZnVuY0RlZmluaXRpb25cbiAgICAvLyB9KVxuXG4gICAgLy8gY29uc3QgZWNzTGFtYmRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcImVjc3Rhc2tsYW1iZGFcIiwge1xuICAgIC8vICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gICAgLy8gICBoYW5kbGVyOiBcImluZGV4LmhhbmRsZXJcIixcbiAgICAvLyAgIGNvZGU6IG5ldyBsYW1iZGEuQXNzZXRDb2RlKFwibGFtYmRhXCIpLFxuICAgIC8vICAgZnVuY3Rpb25OYW1lOiBgJHtTVEFDS19OQU1FfS1lY3MtdGFzay1jaGFuZ2VgXG4gICAgLy8gfSlcblxuICAgIC8vIGVjc0xhbWJkYS5hZGRUb1JvbGVQb2xpY3kobmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgLy8gICBhY3Rpb25zOiBbXCJzdGF0ZXM6U2VuZFRhc2tTdWNjZXNzXCJdLFxuICAgIC8vICAgcmVzb3VyY2VzOiBbbG9hZHRlc3RzZm4uc3RhdGVNYWNoaW5lQXJuXVxuICAgIC8vIH0pKVxuXG4gICAgLy8gY29uc3QgY3dSdWxlID0gbmV3IFJ1bGUodGhpcywgXCJjdy1ydWxlXCIsIHtcbiAgICAvLyAgIGRlc2NyaXB0aW9uOiBcIlJ1bGUgdGhhdCBsb29rcyBhdCBFQ1MgVGFzayBjaGFuZ2Ugc3RhdGUgYW5kIHRyaWdnZXJzIExhbWJkYSBmdW5jdGlvblwiLFxuICAgIC8vICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvLyAgIHJ1bGVOYW1lOiBcIkVDUy10YXNrLWNoYW5nZS1jZGtcIixcbiAgICAvLyAgIHRhcmdldHM6IFtcbiAgICAvLyAgIF1cbiAgICAvLyB9KVxuXG4gICAgLy8gY3dSdWxlLmFkZEV2ZW50UGF0dGVybih7XG4gICAgLy8gICBzb3VyY2U6IFsnYXdzLmVjcyddLFxuICAgIC8vICAgZGV0YWlsVHlwZTogW1wiRUNTIFRhc2sgU3RhdGUgQ2hhbmdlXCJdLFxuICAgIC8vICAgZGV0YWlsOiB7XG4gICAgLy8gICAgIGNsdXN0ZXJBcm46IFtjbHVzdGVyLmNsdXN0ZXJBcm5dLFxuICAgIC8vICAgICBsYXN0U3RhdHVzOiBbXCJTVE9QUEVEXCJdXG4gICAgLy8gICB9XG4gICAgLy8gfSlcblxuICAgIC8vIGN3UnVsZS5hZGRUYXJnZXQobmV3IHRhcmdldHMuTGFtYmRhRnVuY3Rpb24oZWNzTGFtYmRhKSlcblxuICB9XG59XG4iXX0=
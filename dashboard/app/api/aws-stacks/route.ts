import { CloudFormationClient, ListStacksCommand } from "@aws-sdk/client-cloudformation"; // ES Modules import

export async function GET(request: Request) {
  const client = new CloudFormationClient({ region: process.env.AWS_REGION });
  const response = await client.send(new ListStacksCommand({}));
  console.log(response);
  const stacks = response.StackSummaries;
  if (!stacks) {
    return new Response(JSON.stringify([]));
  }
  const activestacks = stacks.filter(stack => stack.StackStatus !== 'DELETE_COMPLETE');
  return new Response(JSON.stringify(activestacks));
}

/**    il tipo di js object e' un array di oggetti:
 * {
      StackId: 'arn:aws:cloudformation:eu-north-1:861507897222:stack/valerio-cfn-ecs-6/a4601cf0-edb1-11ed-a50a-0a18394a1810',
      StackName: 'valerio-cfn-ecs-6',
      CreationTime: 2023-05-08T15:05:07.965Z,
      DeletionTime: 2023-05-10T12:40:33.887Z,
      StackStatus: 'DELETE_COMPLETE',
      DriftInformation: [Object]
    },

 */
import { CloudFormationClient, ListStacksCommand, StackSummary } from '@aws-sdk/client-cloudformation';

export async function GET(request: Request) {

    const client = new CloudFormationClient({
        region: process.env.AWS_REGION || 'eu-north-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY || '',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
        }
    });
    const response = await client.send(new ListStacksCommand({}));
    const stacks = response.StackSummaries;
    if (!stacks) {
        return [];
    }
    const activestacks: StackSummary[] = stacks.filter(stack => stack.StackStatus !== 'DELETE_COMPLETE');
    return new Response(JSON.stringify(activestacks))
}
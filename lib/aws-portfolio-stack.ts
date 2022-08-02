import { Stack, StackProps } from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { addStaticPageBucket } from './s3resources';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsPortfolioStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'PortfolioPipeline', {
      pipelineName: 'PortfolioPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('sashinshin/cdk-salt-demo', 'main'), // Remember to change the name of this
        commands: ['npm ci',
          'npm run build',
          'npx cdk synth'],
      }),
    });

    addStaticPageBucket(this);
    // example resource
    // const queue = new sqs.Queue(this, 'AwsPortfolioQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}

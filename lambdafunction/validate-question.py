import json
import boto3
import uuid
import os
from botocore.exceptions import ClientError

s3 = boto3.client('s3')

def handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))
        query = body.get('query')

        if not query or not isinstance(query, str) or len(query.strip()) < 5:
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'error': 'Invalid query: must be a non-empty string with at least 5 characters'
                })
            }

        s3_key = f"queries/{uuid.uuid4()}.json"

        s3.put_object(
            Bucket=os.environ['BUCKET_NAME'],
            Key=s3_key,
            Body=json.dumps({'query': query}),
            ContentType='application/json'
        )

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Query validated and stored',
                's3_key': s3_key
            })
        }

    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'S3 error: {str(e)}'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Internal error: {str(e)}'})
        }
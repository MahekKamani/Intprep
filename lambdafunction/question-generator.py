import json
import boto3
import urllib3
import os

http = urllib3.PoolManager()

def handler(event, context):
    # Extract query from API Gateway event
    body = json.loads(event['body']) if event.get('body') else {}
    query = body.get('query', '')
    
    if not query:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Query is required'})
        }

    # Query OpenSearch for relevant documents
    os_endpoint = os.environ['OPENSEARCH_ENDPOINT']
    os_url = f"https://{os_endpoint}/rag-index/_search"
    os_query = {
        "query": {
            "match": {
                "content": query
            }
        }
    }

    try:
        response = http.request(
            'POST',
            os_url,
            body=json.dumps(os_query),
            headers={'Content-Type': 'application/json'}
        )
        os_results = json.loads(response.data.decode('utf-8'))
        hits = os_results.get('hits', {}).get('hits', [])
        context_text = ' '.join([hit['_source']['content'] for hit in hits[:3]])
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'OpenSearch error: {str(e)}'})
        }

    # Invoke SageMaker for question generation
    sagemaker = boto3.client('sagemaker-runtime')
    endpoint_name = os.environ['SAGEMAKER_ENDPOINT']
    prompt = f"Generate an interview question based on this context: {context_text}"

    try:
        sagemaker_response = sagemaker.invoke_endpoint(
            EndpointName=endpoint_name,
            ContentType='application/json',
            Body=json.dumps({'inputs': prompt})
        )
        question = json.loads(sagemaker_response['Body'].read().decode('utf-8'))['generated_text']
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'SageMaker error: {str(e)}'})
        }

    return {
        'statusCode': 200,
        'body': json.dumps({'question': question})
    }
import { GRAPHQL_API_URL_BASE } from '~/utils/config'

export async function fetchGraphQLGatewayApi<R>(
  {
    query,
    variables,
  }: {
    query: string
    variables: object
  },
  headers: Record<string, string> = {},
): Promise<R> {
  const response = await fetch(`${GRAPHQL_API_URL_BASE}/internal/graphql`, {
    method: 'POST',
    headers: {
      ...headers,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch graphql-gateway`)
  }

  const { data } = (await response.json()) as { data: R }

  return data
}

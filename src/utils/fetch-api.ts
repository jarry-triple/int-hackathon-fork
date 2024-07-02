import { RECOMMENDATION_V2_URL, TNA_V2_URL } from './config'

function generateFetchApi(host: string) {
  return async function fetchApi<R>(
    path: string,
    init?: RequestInit,
  ): Promise<R> {
    const url = `${host}${path.startsWith('/') ? path : `/${path}`}`
    const response = await fetch(url, init)

    if (!response.ok) {
      const data = await response.text()
      throw new Error(`Failed to fetch ${url}: ${data}`)
    }

    const contentType = response.headers.get('content-type')
    const jsonParseAvailable = contentType && /json/.test(contentType)

    const data = (
      jsonParseAvailable ? await response.json() : await response.text()
    ) as R

    return data
  }
}

export const fetchRecommendationV2 = generateFetchApi(RECOMMENDATION_V2_URL)
export const fetchTnaV2 = generateFetchApi(TNA_V2_URL)

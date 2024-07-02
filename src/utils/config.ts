export const MONGODB_URL =
  process.env.MONGODB_URL ||
  'mongodb+srv://kage:knk%231234@knkcluster.mongocluster.cosmos.azure.com/knk?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000'

export const RECOMMENDATION_V2_URL =
  process.env.REACT_APP_RECOMMENDATION_V2_URL ||
  'https://triple-recommendation-v2.proxy.triple-dev.titicaca-corp.com'
export const TNA_V2_URL =
  process.env.TNA_V2_URL || 'https://tna-v2-internal.proxy.dev.triple.zone'
export const GRAPHQL_API_URL_BASE =
  process.env.GRAPHQL_API_URL_BASE ||
  'http://graphql-gateway.proxy.triple-dev.titicaca-corp.com'

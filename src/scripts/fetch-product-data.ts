import { recommendationV2Client } from '~/clients/recommendation-v2.client'
import { tnaV2Client } from '~/clients/tna-v2.client'

const fs = require('fs')

async function run() {
  console.log('TNA 데이터를 불러옵니다.')

  const productIds = await recommendationV2Client.findRecommendedTnaProductIds({
    from: 0,
    size: 20,
    geotags: [
      {
        id: '71476976-cf9a-4ae8-a60f-76e6fb26900d',
        type: 'triple-region',
      },
    ],
  })

  const result = await tnaV2Client.mgetProducts(productIds)

  saveResult(result)
}

function saveResult(result: any) {
  const dir = 'out'
  const filename = `result-${new Date().toISOString()}.json`

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  fs.writeFileSync(`${dir}/${filename}`, JSON.stringify(result, null, 2))

  console.log(`결과를 저장했습니다.: ${dir}/${filename}`)
}

run()

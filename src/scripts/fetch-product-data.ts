import { recommendationV2Client } from '~/clients/recommendation-v2.client'
import { tnaV2Client } from '~/clients/tna-v2.client'
import { TARGET_REGIONS } from '~/utils/fixtures'

const fs = require('fs')

async function run() {
  console.log('TNA 데이터를 불러옵니다.')

  for (const geotag of TARGET_REGIONS) {
    console.log(`지역: ${geotag.name} / ${geotag.id})`)
    const productIds =
      await recommendationV2Client.findRecommendedTnaProductIds({
        from: 0,
        size: 20,
        geotags: [geotag],
      })

    const result = await tnaV2Client.mgetProducts(productIds)

    saveResult(geotag.name, result)
  }
}

function saveResult(target: string, result: any) {
  const dir = 'out'
  const filename = `${target}-result-${new Date().toISOString()}.json`

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  fs.writeFileSync(`${dir}/${filename}`, JSON.stringify(result, null, 2))

  console.log(`결과를 저장했습니다.: ${dir}/${filename}`)
}

run()

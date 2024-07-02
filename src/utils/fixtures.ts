import { ProductEntity } from '~/product/product.entity'
import { Geotag } from './triple-types'

export const TARGET_REGIONS: (Geotag & { name: string })[] = [
  {
    type: 'triple-region',
    id: 'c883cd34-f5c2-4f0a-9960-5f963f9b2dbb',
    name: '바르셀로나',
  },
  {
    type: 'triple-region',
    id: '3fc342f5-1900-4352-a35c-91080632dbe7',
    name: '파리',
  },
  {
    type: 'triple-region',
    id: '759174cc-0814-4400-a420-5668a0517edd',
    name: '제주',
  },
  {
    type: 'triple-region',
    id: '71476976-cf9a-4ae8-a60f-76e6fb26900d',
    name: '오사카',
  },
  {
    type: 'trip-region',
    id: '22b60e7e-afc7-40e1-9237-8f31ed8a842d',
    name: '다낭',
  },
]

const DUMMY_OSAKA_PRODUCT = ProductEntity.ofNew({
  _id: '2658b681-52e0-4804-b384-23a8f800d7e7',
  name: '[오사카] 난카이 라피트 특급열차_디지털 티켓',
  type: 'tna',
  geotag: {
    id: '71476976-cf9a-4ae8-a60f-76e6fb26900d',
    type: 'triple-region',
    name: '오사카',
  },
  image: {
    cloudinaryId: '09ea71d0-194c-43a5-8ac0-4b906226f711',
    id: '5fdb18ae-ed2d-441a-bab5-201f9168ac47',
    type: 'image',
    width: 600,
    height: 414,
    cloudinaryBucket: 'triple-cms',
    sizes: {
      full: {
        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/09ea71d0-194c-43a5-8ac0-4b906226f711.jpeg',
      },
      large: {
        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/09ea71d0-194c-43a5-8ac0-4b906226f711.jpeg',
      },
      small_square: {
        url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/09ea71d0-194c-43a5-8ac0-4b906226f711.jpeg',
      },
    },
  },
})

const DUMMY_BARCELONA_PRODUCT = ProductEntity.ofNew({
  _id: '646d1000-11cb-4b91-b50d-ea331dc4392d',
  name: '사그라다 파밀리아 성당 : 패스트 트랙 입장권',
  type: 'tna',
  geotag: {
    id: 'c883cd34-f5c2-4f0a-9960-5f963f9b2dbb',
    type: 'triple-region',
    name: '바르셀로나',
  },
  image: {
    cloudinaryId: '921707c8-93b3-4718-994a-e1f597093ac4',
    id: '3c2b4e64-1693-444e-a7fa-b1c6cd350cc7',
    type: 'image',
    width: 1000,
    height: 562,
    cloudinaryBucket: 'triple-cms',
    sizes: {
      full: {
        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/921707c8-93b3-4718-994a-e1f597093ac4.jpeg',
      },
      large: {
        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/921707c8-93b3-4718-994a-e1f597093ac4.jpeg',
      },
      small_square: {
        url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/921707c8-93b3-4718-994a-e1f597093ac4.jpeg',
      },
    },
  },
})

const DUMMY_PARIS_PRODUCT = ProductEntity.ofNew({
  _id: 'a9e5401e-9dfb-4929-9b09-b934909cc3d0',
  type: 'tna',
  name: '파리 근교 여행 : 지베르니 모네 정원 + 고흐 마을 + 베르사유 궁전',
  geotag: {
    type: 'triple-region',
    id: '3fc342f5-1900-4352-a35c-91080632dbe7',
    name: '파리',
  },
  image: {
    cloudinaryId: '791d094c-b11d-469b-a678-97173177a91c',
    id: '1cb08f82-9851-4428-b617-2f90dce8faeb',
    type: 'image',
    width: 960,
    height: 551,
    cloudinaryBucket: 'triple-cms',
    sizes: {
      full: {
        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/791d094c-b11d-469b-a678-97173177a91c.jpeg',
      },
      large: {
        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/791d094c-b11d-469b-a678-97173177a91c.jpeg',
      },
      small_square: {
        url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/791d094c-b11d-469b-a678-97173177a91c.jpeg',
      },
    },
  },
})

const DUMMY_JEJU_PRODUCT = ProductEntity.ofNew({
  _id: '388675fc-7c28-4b2f-af8e-36245129c43c',
  type: 'tna',
  name: '제주 아르떼 뮤지엄 입장권',
  geotag: {
    type: 'triple-region',
    id: '759174cc-0814-4400-a420-5668a0517edd',
    name: '제주',
  },
  image: {
    cloudinaryId: '32696dda-a56b-48db-9e3b-725f54bf0786',
    id: '311d8fba-c085-4886-8633-868e53d62c92',
    type: 'image',
    width: 500,
    height: 500,
    cloudinaryBucket: 'triple-cms',
    sizes: {
      full: {
        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/32696dda-a56b-48db-9e3b-725f54bf0786.jpeg',
      },
      large: {
        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/32696dda-a56b-48db-9e3b-725f54bf0786.jpeg',
      },
      small_square: {
        url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/32696dda-a56b-48db-9e3b-725f54bf0786.jpeg',
      },
    },
  },
})

const DUMMY_DANANG_PRODUCT = ProductEntity.ofNew({
  _id: '83a71df9-01ad-4919-8a8e-8ffc418827b1',
  name: '바구니배+호이안 야경투어 #알찬일정 #매일출발 #바구니배 #호텔픽업/드랍 #망고도시락 #조인투어',
  type: 'tna',
  geotag: {
    type: 'trip-region',
    id: '22b60e7e-afc7-40e1-9237-8f31ed8a842d',
    name: '다낭',
  },
  image: {
    cloudinaryId: 'fffcffde-dd35-407f-ba73-0b028f243400',
    id: '509d0160-e78a-42e9-83d2-78a03ffaac83',
    type: 'image',
    width: 900,
    height: 601,
    cloudinaryBucket: 'triple-cms',
    sizes: {
      full: {
        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/fffcffde-dd35-407f-ba73-0b028f243400.jpeg',
      },
      large: {
        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/fffcffde-dd35-407f-ba73-0b028f243400.jpeg',
      },
      small_square: {
        url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/fffcffde-dd35-407f-ba73-0b028f243400.jpeg',
      },
    },
  },
})

export const DUMMY_PRODUCTS = [
  DUMMY_OSAKA_PRODUCT,
  DUMMY_BARCELONA_PRODUCT,
  DUMMY_PARIS_PRODUCT,
  DUMMY_JEJU_PRODUCT,
  DUMMY_DANANG_PRODUCT,
]

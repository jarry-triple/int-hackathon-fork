export type LLMImage = {
  locationName: string // should be precise name for the location. (e.g. 'Eiffel Tower' instead of 'tower'). should be in korean
  region: string // if region is not one of '제주', '도쿄', '바르셀로나', '다낭', '파리', '샌프란시스코', it should be 'etc'
  locationSummary: string // location summary should provide brief description of the location in korean language only. Must be always full sentence.
  tags: string[] // Tags should include keywords for location. Later used for image similarity search. Tags must be provided in Korean.
  objects: {
    name: string // should provide the name of noticeable object in the image as precise as possible. (e.g. 'Eiffel Tower' instead of 'tower'). Provide specific name if it seems to be lodge, restaurant, or attraction. (e.g. 'Hotel ABC' instead of 'hotel').

    type: 'activity' | 'accomodation' | 'restaurant' | 'attraction' // type of the object. If it is not one of 'activity', 'accomodation', 'restaurant', 'attraction', otherwise the object should not be included in 'objects' array.

    tags: string[] // Tags for the object that includes keywords for the object. Later used for image similarity search. Tags must be provided in Korean

    position: {
      x: number // x-axis coordinate of the object in the image. (0 <= x <= 1)
      y: number // y-axis coordinate of the object in the image. (0 <= y <= 1)
    }
  }[]
  data: string
  imageUrl: string
}

export type ImageModel = {
  _id: string
  uploadedAt: Date
} & LLMImage

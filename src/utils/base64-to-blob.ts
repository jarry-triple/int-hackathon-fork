export const base64ToBlob = (base64: string) => {
  const binaryData = Buffer.from(base64, 'base64')
  // Create a Blob from the binary buffer
  return new Blob([binaryData], { type: 'image/jpeg' })
}

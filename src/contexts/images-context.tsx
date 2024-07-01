'use client'

import { createContext, useContext, useState } from 'react'

interface ImagesContextProps {
  selectedImages: string[]
  setSelectedImages: (images: string[]) => void
}

const Context = createContext<ImagesContextProps | undefined>(undefined)

export function ImagesProvider({ children }: { children: React.ReactNode }) {
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  return (
    <Context.Provider value={{ selectedImages, setSelectedImages }}>
      {children}
    </Context.Provider>
  )
}

export function useImagesContext() {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useImagesContext must be used within a ImagesProvider')
  }

  return context
}

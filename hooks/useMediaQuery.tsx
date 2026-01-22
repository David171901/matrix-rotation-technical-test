import { useCallback, useEffect, useState } from 'react'

const useMediaQuery = (type: 'minwidth' | 'maxwidth', dimension: number): boolean => {
  const [isResize, setIsResize] = useState(false)

  const handleResize = useCallback(() => {
    if (type === 'minwidth') {
      setIsResize(window.innerWidth >= dimension)
    }
    if (type === 'maxwidth') {
      setIsResize(window.innerWidth <= dimension)
    }
  }, [dimension, type])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return isResize
}

export default useMediaQuery

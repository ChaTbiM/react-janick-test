import { useCallback, useEffect, useState } from 'react'

import { Movie as MovieType, MovieCategory } from '~/types/Movie'

type FilteredDataResult = {
  filteredData: MovieType[]
  filterByCategory: (shownCategories: MovieCategory[]) => void
}

const useFilter = (movies: MovieType[]): FilteredDataResult => {
  const [filteredData, setFilteredData] = useState<MovieType[]>(movies)

  const filterByCategory = useCallback(
    (shownCategories: MovieCategory[]) => {
      if (movies !== undefined && shownCategories.length > 0) {
        const filteredMoviesByCategory = movies?.filter((movie) =>
          shownCategories.includes(movie.category),
        )
        setFilteredData(filteredMoviesByCategory)
      } else if (shownCategories.length === 0 && movies !== undefined) {
        setFilteredData(movies)
      }
    },
    [movies],
  )

  useEffect(() => {
    if (movies !== undefined) {
      setFilteredData(movies)
    }
  }, [movies])

  return { filteredData, filterByCategory }
}

export default useFilter

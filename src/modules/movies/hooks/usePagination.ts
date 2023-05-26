import { useCallback, useEffect, useState } from 'react'

import { Movie } from '~/types/Movie'

const usePagination = (movies: Movie[], moviesPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(movies.length / moviesPerPage)

  const currentMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage,
  )

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPageNumber) => prevPageNumber + 1)
    }
  }

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPageNumber) => prevPageNumber - 1)
    }
  }, [currentPage])

  useEffect(() => {
    if (currentMovies.length === 0 && totalPages > 0) {
      prevPage()
    }
  }, [currentMovies, totalPages, prevPage])

  return { currentMovies, currentPage, totalPages, nextPage, prevPage }
}

export default usePagination

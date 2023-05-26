import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'

import { InteractionType, Movie as MovieType } from '~/types/Movie'

import Pagination from '~/components/common/Pagination/Pagination'

import { useDeleteMovie, useMovieInteraction } from '../api/queries'
import { fetchAllMovies } from '../api/requests'
import useFilter from '../hooks/useFilter'
import usePagination from '../hooks/usePagination'
import Filters from './Filters'
import Movie from './Movie'

// Side effect Functions
const onDeleteMovieErrorHandler = (movie: MovieType) => {
  Swal.fire({
    title: 'Delete Movie',
    text: `Unable to delete ${movie.title}`,
    icon: 'error',
    showConfirmButton: false,
    timer: 2000,
  })
}
const onDeleteMovieSuccessHandler = (movie: MovieType) => {
  Swal.fire({
    title: 'Delete Movie',
    text: `Movie with title ${movie.title} , was deleted successfully `,
    icon: 'success',
    showConfirmButton: false,
    timer: 2000,
  })
}
const onInteractMovieErrorHandle = (
  movie: MovieType,
  interaction: InteractionType,
) => {
  Swal.fire({
    title: `${interaction.toUpperCase()} Movie`,
    text: `Unable To ${interaction} ${movie.title} `,
    icon: 'error',
    showConfirmButton: false,
    timer: 2000,
  })
}
// ---------------------

const MovieList: React.FC = () => {
  // State
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery('movies', fetchAllMovies)
  const { filteredData, filterByCategory } = useFilter(movies || [])
  const [loadingMovies, setLoadingMovies] = useState(new Set<number>())
  const { currentMovies, currentPage, totalPages, nextPage, prevPage } =
    usePagination(filteredData, 6)

  const deleteMovieMutation = useDeleteMovie({
    onError: onDeleteMovieErrorHandler,
    onSuccess: onDeleteMovieSuccessHandler,
  })
  const interactWithMovieMutation = useMovieInteraction({
    onError: onInteractMovieErrorHandle,
  })

  // Event Handlers
  const deleteMovieHandler = (movie: MovieType) => {
    deleteMovieMutation.mutate(movie)
  }

  const interactWithMovie = (
    movie: MovieType,
    interaction: InteractionType,
  ) => {
    const updatedSet = new Set(loadingMovies)
    updatedSet.add(movie.id)
    setLoadingMovies(updatedSet)
    interactWithMovieMutation.mutate({
      movie,
      interaction,
    })
  }

  useEffect(() => {
    if (interactWithMovieMutation.isSuccess) {
      setLoadingMovies(new Set())
    }
  }, [interactWithMovieMutation.isSuccess])

  // Rendering
  if (isLoading) {
    return <p>loading movies</p>
  }

  if (isError) {
    return <p>Error loading movies</p>
  }

  if (!movies) {
    return <p>There are no movies currently</p>
  }

  if (currentMovies.length === 0) {
    return (
      <div className="flex justify-center align-middle">
        <p className="text-9xl">😁😁😁</p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col">
      <div className="mb-4">
        <Filters
          categoryList={Array.from(
            new Set(movies.map((movie) => movie.category)),
          )}
          filterByCategory={filterByCategory}
        />
      </div>
      <div className="flex flex-wrap place-content-center gap-10">
        {currentMovies.map((movie) => (
          <Movie
            key={`movie-${movie.id}-${movie.title}`}
            title={movie.title}
            category={movie.category}
            poster={movie.poster}
            likes={movie.likes}
            dislikes={movie.dislikes}
            isLikedByUser={movie.isLikedByUser}
            isDislikedByUser={movie.isDislikedByUser}
            isInteractionButtonsLoading={
              interactWithMovieMutation.isLoading && loadingMovies.has(movie.id)
            }
            deleteHandler={() => deleteMovieHandler(movie)}
            likeHandler={(interactionType) =>
              interactWithMovie(movie, interactionType)
            }
            dislikeHandler={(interactionType) =>
              interactWithMovie(movie, interactionType)
            }
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
    </div>
  )
}
export default MovieList

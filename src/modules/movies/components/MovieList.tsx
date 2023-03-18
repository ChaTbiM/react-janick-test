import { useQuery } from 'react-query'
import Swal from 'sweetalert2'

import { Movie as MovieType } from '~/types/Movie'

import { useDeleteMovie } from '../api/queries'
import { fetchAllMovies } from '../api/requests'
import Movie from './Movie'

const MovieList: React.FC = () => {
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

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery('movies', fetchAllMovies)
  const deleteMovieMutation = useDeleteMovie({
    onError: onDeleteMovieErrorHandler,
    onSuccess: onDeleteMovieSuccessHandler,
  })

  const deleteMovieHandler = (movie: MovieType) => {
    deleteMovieMutation.mutate(movie)
  }

  if (isLoading) {
    return <p>loading movies</p>
  }

  if (isError) {
    return <p>Error loading movies</p>
  }

  if (!movies) {
    return <p>There are no movies currently</p>
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-wrap place-content-center gap-10">
      {movies.map((movie) => (
        <Movie
          key={`movie-${movie.id}-${movie.title}`}
          title={movie.title}
          category={movie.category}
          poster={movie.poster}
          deleteHandler={() => deleteMovieHandler(movie)}
        />
      ))}
    </div>
  )
}
export default MovieList

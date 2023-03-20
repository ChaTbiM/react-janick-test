import { useQuery } from 'react-query'
import Swal from 'sweetalert2'

import { InteractionType, Movie as MovieType } from '~/types/Movie'

import { useDeleteMovie, useMovieInteraction } from '../api/queries'
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

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery('movies', fetchAllMovies)
  const deleteMovieMutation = useDeleteMovie({
    onError: onDeleteMovieErrorHandler,
    onSuccess: onDeleteMovieSuccessHandler,
  })
  const interactWithMovieMutation = useMovieInteraction({
    onError: onInteractMovieErrorHandle,
  })

  const deleteMovieHandler = (movie: MovieType) => {
    deleteMovieMutation.mutate(movie)
  }

  const interactWithMovie = (
    movie: MovieType,
    interaction: InteractionType,
  ) => {
    interactWithMovieMutation.mutate({ movie, interaction })
  }

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

  return (
    <div className="mx-auto flex max-w-4xl flex-wrap place-content-center gap-10">
      {movies.map((movie) => (
        <Movie
          key={`movie-${movie.id}-${movie.title}`}
          title={movie.title}
          category={movie.category}
          poster={movie.poster}
          likes={movie.likes}
          deleteHandler={() => deleteMovieHandler(movie)}
          likeHandler={(interaction) => interactWithMovie(movie, interaction)}
          dislikeHandler={(interaction) =>
            interactWithMovie(movie, interaction)
          }
        />
      ))}
    </div>
  )
}
export default MovieList

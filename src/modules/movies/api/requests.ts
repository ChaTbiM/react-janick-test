import { InteractionType, Movie } from '~/types/Movie'

const fetchAllMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`https://backend.com/movies`)
  return response.json()
}

const deleteMovie = async (movie: Movie): Promise<Movie> => {
  const response = await fetch(`https://backend.com/movies/${movie.id}`, {
    method: 'DELETE',
  })
  return response.json()
}

export interface InteractWithMovieParams {
  movie: Movie
  interaction: InteractionType
}
const interactWithMovie = async (
  movie: Movie,
  interaction: InteractionType,
): Promise<Movie> => {
  const response = await fetch(
    `https://backend.com/movies/${movie.id}/${interaction}`,
    {
      method: 'POST',
    },
  )
  return response.json()
}

export { deleteMovie, fetchAllMovies, interactWithMovie }

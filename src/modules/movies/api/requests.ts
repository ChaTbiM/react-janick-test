import { Movie } from '~/types/Movie'

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

export { deleteMovie, fetchAllMovies }

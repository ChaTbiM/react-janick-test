import { useMutation, useQueryClient } from 'react-query'

import { Movie } from '~/types/Movie'

import { deleteMovie } from './requests'

export interface UseDeleteMovieParams {
  onError: (movie: Movie) => void
  onSuccess: (movie: Movie) => void
}

export const useDeleteMovie = ({
  onError,
  onSuccess,
}: UseDeleteMovieParams) => {
  const queryClient = useQueryClient()
  const previousMovies = queryClient.getQueryData(['movies']) as Movie[]

  return useMutation({
    mutationFn: (movie: Movie) => deleteMovie(movie),
    onMutate: async (movie) => {
      await queryClient.cancelQueries({ queryKey: ['movies'] })

      const updatedMovies: Movie[] = previousMovies.filter(
        (previosMovies: Movie) => previosMovies.id === movie.id,
      )
      queryClient.setQueryData(['todos'], updatedMovies)

      return { previousMovies }
    },
    onError: (err, movie, context) => {
      if (context?.previousMovies) {
        queryClient.setQueryData(['movies'], context.previousMovies)
      }
      const attemptedDeletedMovie: Movie | undefined =
        context?.previousMovies?.find(
          (previousMovie: Movie) => previousMovie.id === movie.id,
        )
      if (attemptedDeletedMovie) {
        onError(attemptedDeletedMovie)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] })
    },
    onSuccess: (deletedMovie: Movie) => {
      onSuccess(deletedMovie)
    },
  })
}

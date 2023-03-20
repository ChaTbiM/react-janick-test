import { useMutation, useQueryClient } from 'react-query'

import { InteractionType, Movie } from '~/types/Movie'

import { deleteMovie, interactWithMovie } from './requests'

export interface DefaultMutationParmas {
  onError: (movie: Movie) => void
  onSuccess: (movie: Movie) => void
}

export interface IntercationMutationParams {
  onError: (movie: Movie, interaction: InteractionType) => void
}

export const useDeleteMovie = ({
  onError,
  onSuccess,
}: DefaultMutationParmas) => {
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

export const useMovieInteraction = ({ onError }: IntercationMutationParams) => {
  const queryClient = useQueryClient()
  const previousMovies = queryClient.getQueryData(['movies']) as Movie[]

  return useMutation({
    mutationFn: (data: { movie: Movie; interaction: InteractionType }) =>
      interactWithMovie(data.movie, data.interaction),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['movies'] })

      const updatedMovies: Movie[] = previousMovies.map((movie) => {
        if (data.movie.id === movie.id) {
          if (data.interaction === InteractionType.Like) {
            return { ...movie, likes: movie.likes + 1 }
          }
          if (data.interaction === InteractionType.Dislike) {
            return { ...movie, likes: movie.likes - 1 }
          }
          return movie
        }
        return movie
      })

      queryClient.setQueryData(['movies'], updatedMovies)

      return { previousMovies }
    },
    onError: (err, data, context) => {
      if (context?.previousMovies) {
        queryClient.setQueryData(['movies'], context.previousMovies)
      }
      const foundMovie: Movie | undefined = context?.previousMovies?.find(
        (previousMovie: Movie) => previousMovie.id === data.movie.id,
      )
      if (foundMovie) {
        onError(foundMovie, data.interaction)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] })
    },
  })
}

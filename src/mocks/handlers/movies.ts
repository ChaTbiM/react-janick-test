import { rest } from 'msw'

import { InteractionType, Movie, MovieCategory } from '~/types/Movie'

let moviesList: Movie[] = [
  {
    id: 1,
    title: 'Oceans 8',
    category: MovieCategory.Comedy,
    poster: '/images/1.jpg',
    likes: 4,
    dislikes: 1,
    isLikedByUser: false,
    isDislikedByUser: false,
  },
  {
    id: 2,
    title: 'Midnight Sun',
    category: MovieCategory.Comedy,
    poster: '/images/2.jpg',
    likes: 2,
    dislikes: 0,
    isLikedByUser: false,
    isDislikedByUser: false,
  },
  {
    id: 3,
    title: 'Les indestructibles 2',
    category: MovieCategory.Animation,
    poster: '/images/3.jpg',
    likes: 3,
    dislikes: 1,
    isLikedByUser: false,
    isDislikedByUser: false,
  },
  {
    id: 4,
    title: 'Sans un bruit',
    category: MovieCategory.Thriller,
    poster: '/images/4.jpg',
    likes: 6,
    dislikes: 6,
    isLikedByUser: false,
    isDislikedByUser: false,
  },
  {
    id: 5,
    title: 'Creed II',
    category: MovieCategory.Drama,
    poster: '/images/5.jpg',
    likes: 16,
    dislikes: 2,
    isLikedByUser: false,
    isDislikedByUser: false,
  },
  {
    id: 6,
    title: 'Gone Girl',
    category: MovieCategory.Thriller,
    poster: '/images/6.jpg',
    likes: 22,
    dislikes: 12,
    isLikedByUser: false,
    isDislikedByUser: false,
  },
  {
    id: 7,
    title: 'Pulp Fiction',
    category: MovieCategory.Thriller,
    poster: '/images/7.jpg',
    likes: 11,
    dislikes: 3,
    isLikedByUser: false,
    isDislikedByUser: false,
  },
  {
    id: 8,
    title: 'Seven',
    category: MovieCategory.Thriller,
    poster: '/images/8.jpg',
    likes: 2,
    dislikes: 1,
    isLikedByUser: false,
    isDislikedByUser: false,
  },
  {
    id: 9,
    title: 'Inception',
    category: MovieCategory.Thriller,
    poster: '/images/9.jpg',
    likes: 2,
    dislikes: 1,
    isLikedByUser: false,
    isDislikedByUser: false,
  },
]

const deleteMovie = (deletedMovieId: number): void => {
  moviesList = moviesList.filter((movie) => deletedMovieId !== movie.id)
}

const likeMovie = (likedMovieId: number): void => {
  moviesList = moviesList.map((movie) => {
    if (movie.id === likedMovieId && !movie.isLikedByUser) {
      const updatedLikes = movie.likes + 1
      return { ...movie, likes: updatedLikes, isLikedByUser: true }
    }
    return movie
  })
}

const removeLike = (likedMovieId: number): void => {
  moviesList = moviesList.map((movie) => {
    if (movie.id === likedMovieId && movie.isLikedByUser) {
      const updatedLikes = movie.likes - 1
      return { ...movie, likes: updatedLikes, isLikedByUser: false }
    }
    return movie
  })
}

const dislikeMovie = (dislikedMovieId: number): void => {
  moviesList = moviesList.map((movie) => {
    if (movie.id === dislikedMovieId && !movie.isDislikedByUser) {
      return { ...movie, dislikes: movie.dislikes + 1, isDislikedByUser: true }
    }
    return movie
  })
}

const removeDislike = (dislikedMovieId: number): void => {
  moviesList = moviesList.map((movie) => {
    if (movie.id === dislikedMovieId) {
      return {
        ...movie,
        dislikes: movie.dislikes > 0 ? movie.dislikes - 1 : 0,
        isDislikedByUser: false,
      }
    }
    return movie
  })
}

const handlers = [
  rest.get('https://backend.com/movies', (_req, res, ctx) =>
    res(ctx.delay(800), ctx.json<Movie[]>(moviesList)),
  ),
  rest.post(
    'https://backend.com/movies/:movieId/:interaction',
    (_req, res, ctx) => {
      const likedMovieId = Number(_req.params.movieId)
      const interactionType = String(_req.params.interaction)

      const foundMovie = moviesList.find((movie) => movie.id === likedMovieId)
      if (foundMovie) {
        if (interactionType === InteractionType.Like) {
          if (!foundMovie.isLikedByUser) {
            likeMovie(foundMovie.id)
          } else if (foundMovie.isLikedByUser) {
            removeLike(foundMovie.id)
          }
        } else if (interactionType === InteractionType.Dislike) {
          if (!foundMovie.isDislikedByUser) {
            dislikeMovie(foundMovie.id)
          } else if (foundMovie.isDislikedByUser) {
            removeDislike(foundMovie.id)
          }
        }
        return res(ctx.delay(800), ctx.json<Movie>(foundMovie))
      }

      return res(ctx.delay(800), ctx.status(404))
    },
  ),
  rest.delete('https://backend.com/movies/:movieId', (_req, res, ctx) => {
    const deletedMovieId = Number(_req.params.movieId)
    const deletedMovie = moviesList.find((movie) => movie.id === deletedMovieId)
    if (deletedMovie) {
      deleteMovie(deletedMovie.id)
      return res(ctx.delay(800), ctx.json<Movie>(deletedMovie))
    }

    return res(ctx.delay(800), ctx.status(404))
  }),
]

export default handlers

import { fireEvent, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import {
  InteractionType,
  Movie as MovieType,
  MovieCategory,
} from '~/types/Movie'

import Movie from './Movie'

// Personally I am against unit tests for frontend HOWEVER I have tests the Movie component API (IN's and OUT's)
// without testing internals  setIsLiked/setDisliked ( because I have to trust React that the setState is working perfectly )
describe('Movie Component', () => {
  let queryClient: QueryClient

  beforeAll(() => {
    queryClient = new QueryClient()
  })

  afterEach(() => {
    queryClient.clear()
  })

  const movie: MovieType = {
    id: 1,
    title: 'Test Movie',
    category: MovieCategory.Animation,
    poster: '/images/1.jpg',
    likes: 10,
    dislikes: 5,
    isLikedByUser: false,
    isDislikedByUser: false,
  }

  const movieProps = {
    ...movie,
    isInteractionButtonsLoading: false,
    deleteHandler: jest.fn(),
    likeHandler: jest.fn(),
    dislikeHandler: jest.fn(),
  }

  // initial state
  test('renders the movie component with like/dislike buttons', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Movie {...movieProps} />
      </QueryClientProvider>,
    )

    expect(screen.getByText('10 Likes')).toBeInTheDocument()
    expect(screen.getByText('5 Dislikes')).toBeInTheDocument()
  })

  test('calls likeHandler when like button is clicked', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Movie {...movieProps} />
      </QueryClientProvider>,
    )

    fireEvent.click(screen.getByText('10 Likes'))
    expect(movieProps.likeHandler).toHaveBeenCalledTimes(1)
    expect(movieProps.likeHandler).toHaveBeenCalledWith(InteractionType.Like)
  })

  test('calls dislikeHandler when dislike button is clicked', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Movie {...movieProps} />
      </QueryClientProvider>,
    )

    fireEvent.click(screen.getByText('5 Dislikes'))
    expect(movieProps.dislikeHandler).toHaveBeenCalledTimes(1)
    expect(movieProps.dislikeHandler).toHaveBeenCalledWith(
      InteractionType.Dislike,
    )
  })

  test('disables like/dislike buttons when loading', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Movie
          {...movieProps}
          isInteractionButtonsLoading
        />
      </QueryClientProvider>,
    )

    expect(screen.getByText('10 Likes')).toBeDisabled()
    expect(screen.getByText('5 Dislikes')).toBeDisabled()
  })

  test('calls deleteHandler when delete button is clicked', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Movie {...movieProps} />
      </QueryClientProvider>,
    )

    fireEvent.click(screen.getByText('delete'))
    expect(movieProps.deleteHandler).toHaveBeenCalledTimes(1)
  })
})

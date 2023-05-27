import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { Movie, MovieCategory } from '~/types/Movie'

import useFilter from './useFilter'

describe('useFilter', () => {
  // This movies data does not have the movie with Animation category
  const movies: Movie[] = [
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

  describe('filterByCategory', () => {
    it('should return true if the movie category is included in the shown categories', async () => {
      const { result: renderedHook } = renderHook(() => useFilter(movies))
      const { filter } = renderedHook.current

      const shownCategories = [MovieCategory.Thriller, MovieCategory.Drama]
      await act(() => {
        filter(shownCategories, '')
      })
      // Check if the filtered data contains movies with the specified categories
      const moviesWithShownCategories = movies.filter((movie) =>
        shownCategories.includes(movie.category),
      )
      const { filteredData } = renderedHook.current
      expect(filteredData).toEqual(moviesWithShownCategories)
    })

    // it('should return false if the movie category is not included in the shown categories',  async () => {
    //   const { result: renderedHook } = renderHook(() => useFilter(movies))
    //   const { filter } = renderedHook.current

    //   const shownCategories = [MovieCategory.Animation]

    //    await act(() => {
    //     filter(shownCategories, '')
    //   })

    //   const {filteredData} = renderedHook.current;
    //   expect(filteredData.length).toEqual(0)
    // })
  })

  // describe('search', () => {
  //   it('should return true if the movie title contains the searched value (case-insensitive)',async () => {
  //     const { result: renderedHook } = renderHook(() => useFilter(movies))
  //     const { filter } = renderedHook.current

  //     const searchedValue = 'Movie 1'
  //     await act(() => {
  //       filter([], searchedValue)
  //     })

  //     const searchedMovies = movies.filter((movie) =>
  //       movie.title.includes(searchedValue),
  //     )

  //     const {filteredData} = renderedHook.current;
  //     expect(filteredData).toEqual(searchedMovies)
  //   })

  //   it('should return false if the movie title does not contain the searched value (case-insensitive)', async () => {
  //     const { result: renderedHook } = renderHook(() => useFilter(movies))
  //     const { filter } = renderedHook.current

  //     const searchedValue = 'drama'
  //     await act(() => {
  //       filter([], searchedValue)
  //     })

  //     const {filteredData} = renderedHook.current;
  //     expect(filteredData.length).toEqual(0)
  //   })
  // })
})

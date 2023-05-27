import { useCallback, useEffect, useState } from 'react'
import {
  FieldValues,
  useForm,
  UseFormRegister,
  useWatch,
} from 'react-hook-form'

import {
  CategoryFilterType,
  FiltersType,
  Movie as MovieType,
  MovieCategory,
} from '~/types/Movie'

type FilteredDataResult = {
  filteredData: MovieType[]
  categoryList: MovieCategory[]
  filter: (shownCategories: MovieCategory[], searchedValue: string) => void
  registerToFilterForm: UseFormRegister<FieldValues & FiltersType>
}

const getCategoryListFromMovies = (movies: MovieType[]): MovieCategory[] =>
  Array.from(new Set(movies.map((movie) => movie.category)))

const useFilter = (movies: MovieType[]): FilteredDataResult => {
  const [filteredData, setFilteredData] = useState<MovieType[]>(movies)
  const [categoryList, setCategoryList] = useState(
    getCategoryListFromMovies(movies),
  )

  const categoryFiltersList = categoryList.reduce(
    (object, key) => ({ ...object, [key]: false }),
    {} as CategoryFilterType,
  )
  const { register, control } = useForm({
    defaultValues: { categoryFiltersList, searchValue: '' },
  })

  const watchedCategoryFilters = useWatch({
    control,
    name: 'categoryFiltersList',
  })

  const watchedSearchedValue = useWatch({
    control,
    name: 'searchValue',
  })

  const filterByCategory = useCallback(
    (movie: MovieType, shownCategories: MovieCategory[]) =>
      shownCategories.includes(movie.category),
    [],
  )

  const search = useCallback(
    (movie: MovieType, searchedValue: string) =>
      movie.title.toLowerCase().includes(searchedValue.toLowerCase()),
    [],
  )

  const filter = useCallback(
    (shownCategories: MovieCategory[] = [], searchedValue = '') => {
      const results: MovieType[] = movies
        .filter((movie) =>
          searchedValue.length > 0 ? search(movie, searchedValue) : true,
        )
        .filter((movie) =>
          shownCategories.length > 0
            ? filterByCategory(movie, shownCategories)
            : true,
        )

      setFilteredData(results)
    },
    [filterByCategory, search, movies],
  )

  useEffect(() => {
    if (movies.length > 0) {
      setFilteredData(movies)
      setCategoryList(getCategoryListFromMovies(movies))
    }
  }, [movies])

  useEffect(() => {
    const shownCategories = categoryList.filter(
      (key) => watchedCategoryFilters[key as keyof typeof MovieCategory],
    ) as MovieCategory[]
    filter(shownCategories, watchedSearchedValue)
  }, [watchedCategoryFilters, watchedSearchedValue, filter, categoryList])

  return { filteredData, filter, registerToFilterForm: register, categoryList }
}

export default useFilter

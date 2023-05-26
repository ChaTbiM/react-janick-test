import { FC, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { MovieCategory } from '~/types/Movie'

type CategoryFilter = {
  [key in MovieCategory]: boolean
}

interface FiltersProps {
  categoryList: MovieCategory[]
  filterByCategory: (shownCategories: MovieCategory[]) => void
}

const Filters: FC<FiltersProps> = ({ categoryList, filterByCategory }) => {
  const categoryFiltersList = categoryList.reduce(
    (object, key) => ({ ...object, [key]: false }),
    {} as CategoryFilter,
  )
  const { register, control } = useForm({
    defaultValues: { categoryFiltersList },
  })

  const watchedCategoryFilters = useWatch({
    control,
    name: 'categoryFiltersList',
  })

  useEffect(() => {
    const shownCategories = Object.keys(watchedCategoryFilters).filter(
      (key) => watchedCategoryFilters[key as keyof typeof MovieCategory],
    ) as MovieCategory[]
    filterByCategory(shownCategories)
  }, [watchedCategoryFilters, filterByCategory])

  return (
    <div>
      {categoryList.map((category) => (
        <label
          className="mr-4"
          key={`category-${category}`}
          htmlFor={`category-${category}`}
        >
          <input
            className="mr-2"
            type="checkbox"
            id={`category-${category}`}
            {...register(`categoryFiltersList.${category}`)}
          />
          {category}
        </label>
      ))}
    </div>
  )
}

export default Filters

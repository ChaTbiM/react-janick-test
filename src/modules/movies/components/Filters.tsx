import { FC } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import { FiltersType, MovieCategory } from '~/types/Movie'

interface FiltersProps {
  registerToFilterForm: UseFormRegister<FieldValues & FiltersType>
  categoryList: MovieCategory[]
}
const Filters: FC<FiltersProps> = ({ registerToFilterForm, categoryList }) => (
  <div className="flex flex-col justify-center align-middle">
    <div>
      <input
        type="text"
        placeholder="Search..."
        {...registerToFilterForm('searchValue')}
      />
    </div>
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
            {...registerToFilterForm(`categoryFiltersList.${category}`)}
          />
          {category}
        </label>
      ))}
    </div>
  </div>
)

export default Filters

import { FC } from 'react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onNextPage: () => void
  onPrevPage: () => void
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}) => (
  <div className="my-8 flex justify-center">
    <button
      type="button"
      className={`mx-1 rounded-md  ${
        currentPage === 1 ? 'bg-blue-300' : 'bg-blue-500'
      } px-4 py-2 text-white`}
      onClick={onPrevPage}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span className="px-4 py-2 text-gray-700">
      Page <span data-testid="current-page">{currentPage}</span> of{' '}
      <span data-testid="total-page">{totalPages}</span>
    </span>
    <button
      type="button"
      className={`mx-1 rounded-md  ${
        currentPage === totalPages ? 'bg-blue-300' : 'bg-blue-500'
      } px-4 py-2 text-white`}
      onClick={onNextPage}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
)

export default Pagination

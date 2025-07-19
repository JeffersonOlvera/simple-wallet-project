import { cn } from '@/lib/utils'

type PaginationProps<T> = {
  data: Array<T>
  totalPages: number
  currentPage: number
  onChange: (page: number) => void
  renderItem: (item: T, index: number) => React.ReactNode
}

export const Pagination = <T,>(props: PaginationProps<T>) => {
  const { data, totalPages, currentPage, onChange, renderItem } = props

  return (
    <div className="flex flex-col gap-y-4 mt-[2rem]">
      <div className="flex flex-col sm:flex-row justify-center sm:gap-x-[1rem] gap-y-4">
        {data.map((item, index) => renderItem(item, index))}
      </div>

      <div className="flex justify-center gap-x-4">
        <button
          className={cn(
            'bg-gray-200 px-4 py-2 rounded-lg',
            currentPage === 1 && 'cursor-not-allowed opacity-50',
          )}
          disabled={currentPage === 1}
          onClick={() => onChange(currentPage - 1)}
        >
          Anterior
        </button>
        <button
          className={cn(
            'bg-gray-200 px-4 py-2 rounded-lg',
            currentPage === totalPages && 'cursor-not-allowed opacity-50',
          )}
          disabled={currentPage === totalPages}
          onClick={() => onChange(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default Pagination

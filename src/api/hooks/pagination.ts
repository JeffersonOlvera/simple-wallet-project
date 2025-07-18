import React from 'react'

type PaginationProps<T> = {
  data: Array<T>
  pageSize: number
}

export const usePagination = <T>(params: PaginationProps<T>) => {
  const { data, pageSize } = params

  const [page, setPage] = React.useState(1)

  const [totalPages, setTotalPages] = React.useState(
    Math.ceil(data.length / pageSize),
  )

  React.useEffect(() => {
    setTotalPages(Math.ceil(data.length / pageSize))
  }, [data, pageSize])

  const pageData = React.useMemo(() => {
    const start = (page - 1) * pageSize
    const end = start + pageSize

    return data.slice(start, end)
  }, [JSON.stringify(data), page, pageSize])

  return {
    page,
    pageData,
    totalPages,
    totalItems: data.length,
    nextPage,
    prevPage,
    goToPage,
  }

  function nextPage() {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  function goToPage(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }
}

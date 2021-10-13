import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router"

import { ROUTES } from "@constants/routes"

interface HookType {
  handleChangePage: (nextPage: number) => void
  currentPage: number
}

const useHandlePageChange = (): HookType => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)
  // because of ssr
  useEffect(() => {
    const query = router.query || {}
    const page: number =
      query?.page && parseInt(query?.page as string)
        ? (parseInt(query?.page as string) || 1)
        : 1
    setCurrentPage(page)
  }, [])
  const handleChangePage = useCallback(
    ( newPage: number) => {
      const query = router.query || {}
      setCurrentPage(() => {
        router.push({
          pathname: ROUTES.USERS,
          query: { ...query, page: newPage + 1 },
        })
        return newPage + 1
      })
    },
    [router]
  )
  return {
    currentPage,
    handleChangePage,
  }
}

export default useHandlePageChange

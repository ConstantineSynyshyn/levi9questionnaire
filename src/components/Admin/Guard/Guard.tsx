import { ROUTES } from "@constants/routes"
import { useSession } from "next-auth/client"
import router from "next/router"
import React from "react"


const Guard: React.FC = ({ children }) => {
  const [session, loading] = useSession()
  // @ts-ignore
  const isAdmin = session?.user?.isAdmin
  React.useEffect(() => {
    if (loading) return
    if (!isAdmin) {
      router.replace(ROUTES.INDEX)
    }
  }, [isAdmin, loading])

  if (isAdmin) {
    return (<>children</>)
  }

  return null;
}

export default Guard

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { OrderDirection } from "@constants/configuration"
import { ROUTES } from "@constants/routes"

interface HookType {
  doOrderList: (sortBy: string) => void
  direction: OrderDirection
  sortBy?: string
}

interface OrderState {
  sortBy?: string
  directions?: {
    [key: string]: OrderDirection
  }
}

const useHandleSort = (): HookType => {
  const [orderState, setOrderState] = useState<OrderState>({})
  const router = useRouter()
  const query = router.query || {}
  const { order, dir = OrderDirection.ASC } = query
  useEffect(() => {
    if (order) {
      const orderValue: string = order as string
      const currentDirection: OrderDirection = dir as OrderDirection
      setOrderState({
        sortBy: orderValue,
        directions: { [orderValue]: currentDirection },
      });
    }
  }, []);
  const doOrderList = useCallback(
    (sortBy) => {
      setOrderState((currentState) => {
        const direction =
          currentState?.directions?.[sortBy] === OrderDirection.ASC
            ? OrderDirection.DESC
            : OrderDirection.ASC
        const query = router.query || {}
        router.push({
          pathname: ROUTES.USERS,
          query: { ...query, order: sortBy, dir: direction },
        });
        return {
          sortBy,
          directions: {
            ...currentState?.directions,
            [sortBy]: direction,
          },
        }
      })
    },
    [router, query]
  );
  const direction = orderState?.sortBy
    ? orderState?.directions?.[orderState?.sortBy] || OrderDirection.ASC
    : OrderDirection.ASC
  return {
    doOrderList,
    direction,
    sortBy: orderState?.sortBy,
  }
}

export default useHandleSort

import { NextPage } from "next"
import { ComponentType, ReactElement, ReactNode } from "react"

export type Page<T = {}> = NextPage<T> &
  Partial<{
    getLayout: (page: ReactElement) => ReactNode
    layout: ComponentType
    requireAuth: boolean
    isAdminPage: boolean
  }>

export interface LeftTimeType {
  hours?: number
  minutes?: number
  seconds?: number
}

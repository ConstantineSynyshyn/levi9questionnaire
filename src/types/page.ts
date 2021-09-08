import { NextPage } from "next";
import { ComponentType, ReactElement, ReactNode } from "react";

export type Page<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

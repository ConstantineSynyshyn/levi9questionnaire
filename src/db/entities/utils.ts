import { OrderDirection } from "@constants/configuration";

export const convertStringedDirectionToMongo = (direction?: string): number =>
  OrderDirection.DESC === direction ? -1 : 1

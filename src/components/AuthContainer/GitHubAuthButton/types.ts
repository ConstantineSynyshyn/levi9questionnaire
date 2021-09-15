import { SignInProviderProps } from "../types";

export interface Props {
  onAuth: (data: SignInProviderProps) => void;
}
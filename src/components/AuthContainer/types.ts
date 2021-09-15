import { SignInOptions, SignInAuthorisationParams, SignInProvider } from 'next-auth/client';

export interface Props {}

export interface SignInProviderProps {
  provider?: SignInProvider;
  options?: SignInOptions;
  authorizationParams?: SignInAuthorisationParams;
}
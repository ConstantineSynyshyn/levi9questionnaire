import NextLink from "next/link"
import { forwardRef } from "react"

import { LinkProps } from "./types"

// allows component to accept all properties of "a" tag
// and solves jsx-a11y/anchor-is-valid rule issue
const Link = forwardRef(
  ({ to, ...props }: LinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
    return (
      <NextLink href={to} data-component="Link">
        <a {...props} ref={ref}>
          {props.children}
        </a>
      </NextLink>
    )
  }
)

export default Link

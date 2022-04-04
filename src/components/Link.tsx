import NextLink from "next/link";

import { LinkProps } from "../types";

const Link = ({ href, children }: LinkProps) => {
  return (
    <NextLink href={href}>
      <a className="underline underline-offset-1 text-blue-700">{children}</a>
    </NextLink>
  );
};

export default Link;

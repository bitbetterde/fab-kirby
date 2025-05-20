import { LinkContext } from "@fchh/fcos-suite-ui";
import { Link } from "@inertiajs/react";

export function InertiaLinkWrapper({ children }: React.PropsWithChildren) {
  return (
    <LinkContext.Provider
      value={{
        linkRenderFn: (linkChildren, linkTarget, linkProps) => {
          return (
            <Link href={linkTarget} {...linkProps}>
              {linkChildren}
            </Link>
          );
        },
      }}
    >
      {children}
    </LinkContext.Provider>
  );
}

// CSS from UI Library
import "@fchh/fcos-suite-ui/style.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";

import { Footer, Header } from "@fchh/fcos-suite-ui";
import { Home } from "@carbon/icons-react";
import { CarbonIcon } from "../components/CarbonIcon";
import { FilterableHorizontalNewsCardList } from "../components/FilterableHorizontalNewsCardList";
import { InertiaLinkWrapper } from "../components/InertiaLinkWrapper";

export default (props) => {
  // console.log("HorizontalView Template", props);

  return (
    <InertiaLinkWrapper>
      <Header
        topBarItems={props?.menu.children}
        toolBarItems={props?.toolbar?.map((item) => ({
          ...item,
          icon: (
            <CarbonIcon
              name={item.icon}
              className="size-6 sm:size-5 sm:mr-2 mb-1 sm:mb-0"
            />
          ),
        }))}
        hideSearchIcon
        organization={props.organization || "frbs"}
        languages={props.languages}
        selectedLanguage={props?.activelanguage}
      />
      <FilterableHorizontalNewsCardList
        breadcrumbs={props?.breadcrumbs.map((crumb, i) =>
          i == 0 ? { ...crumb, icon: <Home className="size-4 shrink-0" /> } : crumb,
        )}
        title={props.page.content.title}
        subtitle={props.page.content.subheading}
        titleImage={props.heroimage.url}
        pageSize={props.page.pageSize}
        cards={props.page.content.text.content.resolvedChildren.map(
          (child) => ({
            id: child.url,
            className: "fs-not-prose",
            type: "dark",
            title: child.content.title,
            category: child.content.tag ? { id: 1, title: child.content.tag } : undefined,
            description: child.content.teaser,
            href: child.url,
            image: {
              alt: child.content.heroimage?.name,
              src: child.content.heroimage?.url,
            },
          }),
        )}
      />
      <Footer
        copyright={props.bottomline}
        socialMediaGrow={false}
        menu={props?.footermenu.children}
        supportedBy={props.supportedby}
        socialMedia={props?.socialmedia?.map((media) => ({
          href: media.href,
          type: media.platform,
        }))}
        policyLinks={props?.policylinks}
      />
    </InertiaLinkWrapper>
  );
};

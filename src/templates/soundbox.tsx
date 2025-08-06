// CSS from UI Library
import "@fchh/fcos-suite-ui/style.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";

import { Article, Footer, Header } from "@fchh/fcos-suite-ui";
import { Home } from "@carbon/icons-react";
import { CarbonIcon } from "../components/CarbonIcon";
import { InertiaLinkWrapper } from "../components/InertiaLinkWrapper";
import { BlockMultiplexer } from "../components/BlockMultiplexer";
import { SoundboxCard } from "../components/SoundboxCard";

// interface ArticleTemplateProps {
//   toolbar: IToolbarItem[];
//   menu: IMenuItem[];
// }

// The soundbox template is identical to the article template, but it adds the soundbox section below the content
export default (props) => {
  const blocks = props?.page?.content?.text ?? [];

  return (
    <InertiaLinkWrapper>
      <Header
        topBarItems={props?.menu.children}
        toolBarItems={props?.toolbar?.map((item) => ({
          ...item,
          icon: (
            <CarbonIcon
              name={item.icon}
              className="size-6 sm:size-5 sm:mr-2 mb-1 sm:mb-0 shrink-0"
            />
          ),
        }))}
        hideSearchIcon
        organization={props.organization || "frbs"}
      />
      <Article
        titleImage={props?.heroimage?.url}
        titleImageAlt={props?.heroimage?.alt}
        titleImageTag={props?.heroimage?.credits}
        breadcrumbs={props?.breadcrumbs.map((crumb, i) =>
          i == 0 ? { ...crumb, icon: <Home className="size-4" /> } : crumb
        )}
        hideFooterSeparator={true}
        title={props?.page?.content.title}
        subtitle={props?.page?.content.subheading}
        teaser={props?.page.content.teaser}
      >
        {blocks?.map((block, i) => (
          <BlockMultiplexer block={block} key={block.id || "block" + i} />
        ))}
        {props.recordings && props.recordings.length > 0 && (
          <div className="py-8 fs-not-prose">
            <ul className="grid grid-cols-3 gap-4">
              {props.recordings.map((recording, i) => {
                return <SoundboxCard key={i} recording={recording} />;
              })}
            </ul>
          </div>
        )}
      </Article>

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

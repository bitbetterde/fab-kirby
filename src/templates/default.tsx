// CSS from UI Library
import "@fchh/fcos-suite-ui/style.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";
import { CarbonIcon } from "../components/CarbonIcon";
import { InertiaLinkWrapper } from "../components/InertiaLinkWrapper";

import {
  Footer,
  Header,
  HeroSection,
} from "@fchh/fcos-suite-ui";
import { BlockMultiplexer } from "../components/BlockMultiplexer";

export default (props) => {
  // console.log("Default Template:", props);

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
      <HeroSection src={props?.heroimage?.url} />
      <main
        className={
          "grid grid-cols-outer [&>*]:col-start-1 [&>*]:col-end-4 [&>*]:w-full overflow-hidden"
        }
      >
        {blocks?.map((block, i) => (
          <BlockMultiplexer block={block} key={block.id || "block" + i} fullBleed />
        ))}
      </main>
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

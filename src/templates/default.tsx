// CSS from UI Library
import "@fchh/fcos-suite-ui/style.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";
import { CarbonIcon } from "../components/CarbonIcon";

import { Footer, Header, HeroSection } from "@fchh/fcos-suite-ui";

export default (props) => {
  console.log("Default Template:", props);

  return (
    <div>
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
        organization="frbs"
      />
      <HeroSection src={props?.page?.files[0]} />
      <main>
        <div style={{ paddingTop: "4rem" }}>{props?.page?.content?.text}</div>
      </main>
      <Footer
        socialMediaGrow={false}
        menu={props?.menu.children}
        socialMedia={props?.socialmedia?.map((media) => ({
          href: media.href,
          type: media.platform,
        }))}
      />
    </div>
  );
};

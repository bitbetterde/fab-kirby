// CSS from UI Library
import "@fchh/fcos-suite-ui/dist/fcos-suite-ui.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";
import { CarbonIcon } from "../components/CarbonIcon";

import { Footer, Header, HeroSection } from "@fchh/fcos-suite-ui";
import ImageBlock from "../components/blocks/ImageBlock";
import ActionBoxBlock from "../components/blocks/ActionBoxBlock";
import YoutubeEmbedBlock from "../components/blocks/YoutubeEmbedBlock";

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
      />
      <HeroSection src={props?.page?.files[0]} />
      <main>

        <div style={{ paddingTop: "4rem" }}>
          {props?.blocks?.map((block, index) => {
            switch (block.type) {
              case "image":
                return <ImageBlock key={index} block={block} />;
              case "actionbox":
                return <ActionBoxBlock key={index} block={block} />;
              case "youtube":
                return <YoutubeEmbedBlock key={index} block={block} />;
              default:
                return null;
            }
          })}
        </div>
      </main>
      <Footer menu={props?.menu.children} />
    </div>
  );
};

// CSS from UI Library
import "@fchh/fcos-suite-ui/style.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";
import { CarbonIcon } from "../components/CarbonIcon";

import { Footer, Header, HeroSection, VerticalNewsCardSlider } from "@fchh/fcos-suite-ui";

export default (props) => {
  console.log("Default Template:", props);

  const blocks = props?.page?.content?.text ?? [];

  return (
    <div>
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
        organization="frbs"
      />
      <HeroSection src={props?.page?.files[0]} />
      <main
        className={
          "grid grid-cols-outer [&>*]:col-start-2 [&>*]:col-end-2 [&>*]:w-full overflow-x-hidden"
        }
      >
        {blocks?.map((block, i) => {
          if (block.type === "fullbleed-text") {
            return (
              <div key={"block"+i} className="!col-start-1 py-16 !col-end-4 grid grid-cols-subgrid [&>*]:col-start-2 [&>*]:col-end-2" style={{backgroundColor: block?.content?.bgcolor}}>
                <div className="grid grid-cols-inner">
                  <div
                    className="col-start-1 col-end-14 md:col-start-4 md:col-end-11 prose prose-p:text-xl prose-h2:text-5xl prose-h2:font-plex prose-h2:font-normal prose-p:font-plex max-w-none "
                    dangerouslySetInnerHTML={{ __html: block?.content?.text }}
                  />
                </div>
              </div>
            );
          } else if (block.type === "verticalnewscardslider") {
            const pages =
              block.content.mode === "manual"
                ? block.content.pages
                : block.content.resolvedChildren;
            return (
              <VerticalNewsCardSlider
                className="fs-not-prose py-16"
                variant="dark"
                title={block.content.title}
                fullBleed={block.content.fullbleed === "true"}
                items={pages?.map((page) => ({
                  title: page.content.title,
                  category: { id: 1, title: "Seite" },
                  description: page.content.teaser,
                  href: page.url,
                  image: {
                    alt: page.content.heroimage?.name,
                    src: page.content.heroimage?.url,
                  },
                }))}
              />
            );
          }
          return null;
        })}
      </main>
      <Footer
        copyright={props.bottomline}
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

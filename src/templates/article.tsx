// CSS from UI Library
import "@fchh/fcos-suite-ui/style.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";

import {
  Article,
  Footer,
  Header,
  HorizontalNewsCard,
  Image,
  Person,
  YoutubeEmbed,
  ActionBox,
  Button,
  ImageSlider,
  MiniCard,
  VerticalNewsCardSlider,
  Tabs,
  AccordionItem,
  LogoGrid,
} from "@fchh/fcos-suite-ui";
import { Home } from "@carbon/icons-react";
import { CarbonIcon } from "../components/CarbonIcon";
import { InertiaLinkWrapper } from "../components/InertiaLinkWrapper";
import { truncateStringAtWhitespace } from "../helpers/truncate";

// interface ArticleTemplateProps {
//   toolbar: IToolbarItem[];
//   menu: IMenuItem[];
// }

// The article template is for any kind of "article" like content. Could be a blog post, a news post or an event. It is not intended as home page.
export default (props) => {
  // console.log("Article Template", props);

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
        organization="frbs"
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
        {blocks?.map((block, i) => {
          if (block.type === "person") {
            return (
              <div
                className="grid grid-cols-3 py-8"
                key={block.id || "block" + i}
              >
                {block.content?.people?.map((person, i) => (
                  <Person
                    key={person.name || "person" + i}
                    image={person.image?.url}
                    name={person.name}
                    position={person.position}
                    organization={person.organisation}
                    facebook={person.facebook}
                    instagram={person.instagram}
                    mastodon={person.mastodon}
                    twitter={person.twitter}
                    xing={person.xing}
                    linkedin={person.linkedin}
                    email={person.email}
                    bluesky={person.bluesky}
                  />
                ))}
              </div>
            );
          } else if (block.type === "heading") {
            const HeadlineTag = block.content.level;
            return (
              <HeadlineTag
                key={block.id || "block" + i}
                dangerouslySetInnerHTML={{ __html: block.content.text }}
              ></HeadlineTag>
            );
          } else if (block.type === "image") {
            return (
              <Image
                key={block.id || "block" + i}
                src={
                  block.content.location === "kirby"
                    ? block.content.image?.url
                    : block.content.src
                }
                alt={block.content.alt}
                captionHtml={block.content.caption}
                subCaption={
                  block.content.subcaption
                    ? `Quelle: ${block.content.subcaption}`
                    : undefined
                }
                tag={block.content.tag}
                className="my-8"
              />
            );
          } else if (block.type === "code") {
            return (
              <pre key={block.id || "block" + i}>
                <code className={`language-${block.content.language}`}>
                  {block.content.code}
                </code>
              </pre>
            );
          } else if (block.type === "youtube") {
            return (
              <YoutubeEmbed
                key={block.id || "block" + i}
                videoId={block.content.videoid}
                title={block.content.title}
              />
            );
          } else if (block.type === "imageslider") {
            return (
              <ImageSlider
                key={block.id || "block" + i}
                title={block.content.title}
                images={block.content.images?.map((img) => ({
                  src: img.location === "kirby" ? img.image?.url : img.src,
                  caption: img.caption,
                  subCaption: img.subcaption
                    ? `Quelle: ${img.subcaption}`
                    : undefined,
                  tag: img.tag,
                }))}
                withLightbox={block.content.withlightbox === "true"}
                fullBleed={block.content.fullbleed === "true"}
                showTags={block.content.showtags === "true"}
              />
            );
          } else if (block.type === "actionbox") {
            return (
              <ActionBox
                key={block.id || "block" + i}
                title={block.content.title}
                description={block.content.description}
              >
                {block.content.buttons?.map((button, i) => (
                  <Button
                    key={"actionBoxButton" + i}
                    href={button.target}
                    text={button.caption}
                    size="md"
                    newTab={true}
                    {...(i === 0 ? { type: "primary" } : { type: "tertiary" })}
                    icon={
                      button.icon ? (
                        <CarbonIcon name={button.icon} />
                      ) : undefined
                    }
                  />
                ))}
              </ActionBox>
            );
          } else if (block.type === "horizontalcard") {
            return (
              <HorizontalNewsCard
                key={block.id || "block" + i}
                className="fs-not-prose"
                variant="dark"
                title={block.content.target.content.title}
                category={{ id: 1, title: "Seite" }}
                description={block.content.target.content.teaser}
                href={block.content.target.url}
                image={{
                  alt: block.content.target.content.heroimage?.name,
                  src: block.content.target.content.heroimage?.url,
                }}
              />
            );
          } else if (block.type === "minicard") {
            return (
              <MiniCard
                key={block.id || "block" + i}
                className="fs-not-prose my-8"
                type="dark"
                name={block.content.target.content.title}
                subtitle={truncateStringAtWhitespace(
                  block.content.target.content.text || "",
                  200
                )}
                image={{
                  alt: block.content.target.content.heroimage?.name,
                  src: block.content.target.content.heroimage?.url,
                }}
                href={block.content.target.url}
                tags={[{ id: 1, title: block.content.target.content.category }]}
              />
            );
          } else if (block.type === "verticalnewscardslider") {
            const pages =
              block.content.mode === "manual"
                ? block.content.pages
                : block.content.resolvedChildren;
            return (
              <VerticalNewsCardSlider
                key={block.id || "block" + i}
                className="fs-not-prose"
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
          } else if (block.type === "tabs") {
            return (
              <Tabs
                key={block.id || "block" + i}
                entries={block.content.tabs?.map((tab) => ({
                  label: tab.title,
                  content: tab.text.text,
                }))}
              />
            );
          } else if (block.type === "accordion") {
            return (
              <div className="py-8" key={block.id || "block" + i}>
                {block.content.accordionitems?.map((item) => (
                  <AccordionItem
                    key={item.title}
                    title={item.title}
                    open={item.defaultopen === "true"}
                  >
                    <div dangerouslySetInnerHTML={{ __html: item.text.text }} />
                  </AccordionItem>
                ))}
              </div>
            );
          } else if (block.type === "logogrid") {
            return (
              <LogoGrid
                key={block.id || "block" + i}
                title={block.content.title}
                columns={block.content.columns}
                entries={block.content.logos?.map((img) => ({
                  src: img.url,
                  alt: img.name,
                  href: img.href,
                }))}
              />
            );
          }

          return (
            <div
              key={block.id || "block" + i}
              dangerouslySetInnerHTML={{ __html: block.content.text }}
            ></div>
          );
        })}
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

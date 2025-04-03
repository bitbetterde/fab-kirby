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
} from "@fchh/fcos-suite-ui";
import { Home } from "@carbon/icons-react";
import { CarbonIcon } from "../components/CarbonIcon";

// interface ArticleTemplateProps {
//   toolbar: IToolbarItem[];
//   menu: IMenuItem[];
// }

// The article template is for any kind of "article" like content. Could be a blog post, a news post or an event. It is not intended as home page.
export default (props) => {
  console.log("Article Template", props);

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
      <Article
        titleImage={props?.heroimage?.url}
        titleImageAlt={props?.heroimage?.alt}
        imageTag={props?.heroimage?.credits}
        breadcrumbs={props?.breadcrumbs.map((crumb, i) =>
          i == 0 ? { ...crumb, icon: <Home className="size-4" /> } : crumb,
        )}
        hideFooterSeparator={true}
        title={props?.page?.content.title}
        subtitle={props?.page?.content.subheading}
        teaser={props?.page.content.teaser}
      >
        {blocks?.map((block) => {
          if (block.type === "person") {
            return (
              <div className="grid grid-cols-3 py-8">
                {block.content?.people?.map((person) => (
                  <Person
                    key={person.name}
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
            return <HeadlineTag>{block.content.text}</HeadlineTag>;
          } else if (block.type === "image") {
            return (
              <>
                {/*<pre>{JSON.stringify(block, null, 2)}</pre>*/}
                <Image
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
              </>
            );
          } else if (block.type === "code") {
            return (
              <pre>
                <code className={`language-${block.content.language}`}>
                  {block.content.code}
                </code>
              </pre>
            );
          } else if (block.type === "youtube") {
            return (
              <YoutubeEmbed
                videoId={block.content.videoid}
                title={block.content.title}
              />
            );
          } else if (block.type === "imageslider") {
            return (
              <ImageSlider
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
                title={block.content.title}
                description={block.content.description}
              >
                {block.content.buttons?.map((button, index) => (
                  <Button
                    key={index}
                    href={button.target}
                    text={button.caption}
                    size="md"
                    newTab={true}
                    type="tertiary"
                    icon={
                      button.icon ? <CarbonIcon name={button.icon} /> : null
                    }
                  />
                ))}
              </ActionBox>
            );
          } else if (block.type === "horizontalcard") {
            console.log("test123", block.content.target.content);
            return (
              <HorizontalNewsCard
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
            console.log("test123", block.content);
            return (
              <MiniCard
                className="fs-not-prose my-8"
                type="dark"
                name={block.content.target.content.title}
                subtitle={block.content.target.content.text}
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
                entries={block.content.tabs?.map((tab) => ({
                  label: tab.title,
                  content: tab.text.text,
                }))}
              />
            );
          } else if (block.type === "accordion") {
            return (
              <div className="py-8">
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
          }

          return (
            <div
              key={block.id}
              dangerouslySetInnerHTML={{ __html: block.content.text }}
            ></div>
          );
        })}
      </Article>
      <Footer menu={props?.menu.children} />
    </div>
  );
};

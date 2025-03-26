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
  VerticalNewsCardSlider,
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
              className="size-6 sm:size-5 sm:mr-2 mb-1 sm:mb-0"
            />
          ),
        }))}
        hideSearchIcon
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
                    image={person.image?.[0]?.url}
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
                <pre>{JSON.stringify(block, null, 2)}</pre>
                <Image
                  src={
                    block.content.location === "kirby"
                      ? block.content.image?.url
                      : block.content.src
                  }
                  alt={block.content.alt}
                  caption={block.content.caption}
                  subCaption={block.content.subcaption}
                  tag={block.content.tag}
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
              <YoutubeEmbed videoId={block.content.videoid} title="Hallo" />
            );
          } else if (block.type === "imageslider") {
            return (
              <ImageSlider
                title={block.content.title}
                images={block.content.images?.map((img) => ({
                  src: img.location === "kirby" ? img.image?.[0]?.url : img.src,
                  caption: img.caption,
                  subCaption: img.subcaption,
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

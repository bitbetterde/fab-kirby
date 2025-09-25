import {
  HorizontalNewsCard,
  Image,
  Person,
  ActionBox,
  Button,
  ImageSlider,
  MiniCard,
  VerticalNewsCardSlider,
  Tabs,
  AccordionItem,
  LogoGrid,
} from "@fchh/fcos-suite-ui";
import { CarbonIcon } from "../components/CarbonIcon";
import { truncateStringAtWhitespace } from "../helpers/truncate";
import { Recorder } from "./Recorder";
import YoutubeEmbed from "./YoutubeEmbed";

export interface BlockMultiplexerProps {
  fullBleed?: boolean;
  block: {
    type: string;
    [x: string]: any;
  };
}

export const BlockMultiplexer: React.FC<BlockMultiplexerProps> = ({
  block,
  fullBleed,
}: BlockMultiplexerProps) => {
  if (block?.type === "person") {
    return (
      <div className="grid grid-cols-3 py-8">
        {block?.content?.people?.map((person, i) => (
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
  } else if (block?.type === "heading") {
    const HeadlineTag = block?.content.level;
    return (
      <HeadlineTag
        dangerouslySetInnerHTML={{ __html: block?.content.text }}
      ></HeadlineTag>
    );
  } else if (block?.type === "image") {
    const imageElement = (
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
        className={
          fullBleed
            ? "col-start-2 col-end-13 lg:col-start-4 lg:col-end-11 my-8"
            : ""
        }
      />
    );
    if (fullBleed) {
      return <div className="grid grid-cols-inner">{imageElement}</div>;
    } else {
      return imageElement;
    }
  } else if (block?.type === "code") {
    return (
      <pre>
        <code className={`language-${block?.content.language}`}>
          {block?.content.code}
        </code>
      </pre>
    );
  } else if (block?.type === "youtube-embed") {
    const youtubeElement = (
      <YoutubeEmbed
        className={
          fullBleed
            ? "col-start-2 col-end-13 lg:col-start-4 lg:col-end-11 my-8"
            : ""
        }
        rawUrl={block.content.rawUrl}
        caption={block.content.caption}
        videoId={block.content.videoId}
        thumbnail={block.content.thumbnail}
        embedUrl={block.content.embedUrl}
        embedId={block.content.embedId}
        title={block.content.title}
        privacyText={block.content.privacyText}
      />
    );

    if (fullBleed) {
      return <div className="grid grid-cols-inner">{youtubeElement}</div>;
    } else {
      return youtubeElement;
    }
  } else if (block?.type === "imageslider") {
    return (
      <ImageSlider
        title={block?.content.title}
        images={block?.content.images?.map((img) => ({
          src: img.location === "kirby" ? img.image?.url : img.src,
          caption: img.caption,
          subCaption: img.subcaption ? `Quelle: ${img.subcaption}` : undefined,
          tag: img.tag,
        }))}
        withLightbox={block?.content.withlightbox === "true"}
        fullBleed={block?.content.fullbleed === "true"}
        showTags={block?.content.showtags === "true"}
      />
    );
  } else if (block?.type === "actionbox") {
    return (
      <ActionBox
        title={block?.content.title}
        description={block?.content.description}
      >
        {block?.content.buttons?.map((button, i) => (
          <Button
            key={"actionBoxButton" + i}
            href={button.target}
            text={button.caption}
            size="md"
            newTab={true}
            {...(i === 0 ? { type: "primary" } : { type: "tertiary" })}
            icon={button.icon ? <CarbonIcon name={button.icon} /> : undefined}
          />
        ))}
      </ActionBox>
    );
  } else if (block?.type === "horizontalcard") {
    return (
      <HorizontalNewsCard
        className="fs-not-prose"
        variant="dark"
        title={block?.content.target.content.title}
        description={block?.content.target.content.teaser}
        href={block?.content.target.url}
        image={{
          alt: block?.content.target.content.heroimage?.name,
          src: block?.content.target.content.heroimage?.url,
        }}
      />
    );
  } else if (block?.type === "minicard") {
    return (
      <MiniCard
        className="fs-not-prose my-8"
        type="dark"
        name={block?.content.target.content.title}
        subtitle={truncateStringAtWhitespace(
          block?.content.target.content.text || "",
          200
        )}
        image={{
          alt: block?.content.target.content.heroimage?.name,
          src: block?.content.target.content.heroimage?.url,
        }}
        href={block?.content.target.url}
        tags={[{ id: 1, title: block?.content.target.content.category }]}
      />
    );
  } else if (block?.type === "verticalnewscardslider") {
    const pages =
      block?.content.mode === "manual"
        ? block?.content.pages
        : block?.content.resolvedChildren;

    return (
      <VerticalNewsCardSlider
        className="fs-not-prose py-16"
        variant="dark"
        title={block?.content.title}
        fullBleed={block?.content.fullbleed === "true"}
        items={pages?.map((page) => ({
          title: page.content.title,
          description: page.content.teaser,
          href: page.url,
          image: {
            alt: page.content.heroimage?.name,
            src: page.content.heroimage?.url,
          },
        }))}
      />
    );
  } else if (block?.type === "tabs") {
    return (
      <Tabs
        entries={block?.content.tabs?.map((tab) => ({
          label: tab.title,
          content: tab.text.text,
        }))}
      />
    );
  } else if (block?.type === "accordion") {
    return (
      <div className="py-8">
        {block?.content.accordionitems?.map((item) => (
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
  } else if (block?.type === "logogrid") {
    if (fullBleed) {
      return (
        <div
          className="py-16 grid grid-cols-1 md:grid-cols-subgrid md:[&>*]:col-start-2 md:[&>*]:col-end-2"
          style={{ backgroundColor: block?.content?.bgcolor }}
        >
          <div className="grid grid-cols-inner">
            <LogoGrid
              title={block.content.title}
              columns={block.content.columns}
              entries={block.content.logos?.map((img) => ({
                src: img.url,
                alt: img.name,
                href: img.href,
              }))}
              className="col-start-2 col-end-13 lg:col-start-4 lg:col-end-11"
            />
          </div>
        </div>
      );
    } else {
      return (
        <LogoGrid
          title={block?.content.title}
          columns={block?.content.columns}
          entries={block?.content.logos?.map((img) => ({
            src: img.url,
            alt: img.name,
            href: img.href,
          }))}
        />
      );
    }
  } else if (block?.type === "recorder") {
    return (
      <Recorder
        title={block.content.title}
        description={block.content.description}
        showVisualizer={Boolean(block.content.showvisualizer)}
        successMessage={block.content.successmessage}
        color={block.content.color}
        lightText={block.content.lighttext}
        cardTitle={block.content.cardtitle}
      />
    );
  } else if (block?.type === "codeembed") {
    return <div dangerouslySetInnerHTML={{ __html: block?.content.code }} />;
    // Full Bleed Blocks
  } else if (block?.type === "fullbleed-text") {
    return (
      <div
        className="py-16 grid grid-cols-1 md:grid-cols-subgrid md:[&>*]:col-start-2 md:[&>*]:col-end-2"
        style={{ backgroundColor: block?.content?.bgcolor }}
      >
        <div className="grid grid-cols-inner">
          <div
            className="col-start-2 col-end-13 lg:col-start-4 lg:col-end-11 prose prose-p:text-xl prose-h2:text-5xl prose-h2:font-plex prose-h2:font-normal prose-p:font-plex max-w-none"
            dangerouslySetInnerHTML={{ __html: block?.content?.text }}
          />
        </div>
      </div>
    );
  }
  // Fallback for any other block type
  return <div dangerouslySetInnerHTML={{ __html: block?.content.text }}></div>;
};

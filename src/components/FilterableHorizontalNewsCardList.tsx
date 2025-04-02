// CSS from UI Library
import "../../../fcos-suite-ui/dist/fcos-suite-ui.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";

import { HorizontalNewsCardListView } from "../../../fcos-suite-ui";
import { INews } from "../../../fcos-suite-ui/src/interfaces/INews";
import { useState } from "react";

interface Props {
  titleImage: string;
  titleImageAlt?: string;
  subtitle: string;
  title: string;
  cards: INews[];
  breadcrumbs?: Array<{ target?: string; title: string }>;
  imageTag?: string;
}

export const FilterableHorizontalNewsCardList = ({
  titleImage,
  titleImageAlt,
  subtitle,
  title,
  cards,
  breadcrumbs,
  imageTag,
}: Props) => {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const categoryTitles: string[] = Array.from(
    new Set(cards.map((card) => card.category.title)),
  );

  const allCategories = categoryTitles
    .filter((title) => title.length !== 0)
    .map((category) => ({ title: category }));

  const filteredCards =
    activeCategories.length === 0
      ? cards
      : cards.filter((card) => activeCategories.includes(card.category.title));

  const handleEnable = (category: string) => {
    setActiveCategories((prev) => [...prev, category]);
  };

  const handleDisable = (category: string) => {
    setActiveCategories((prev) => prev.filter((cat) => cat !== category));
  };

  return (
    <HorizontalNewsCardListView
      titleImage={titleImage}
      titleImageAlt={titleImageAlt}
      subtitle={subtitle}
      title={title}
      cards={filteredCards}
      tags={allCategories}
      activeTags={activeCategories}
      onTagEnable={handleEnable}
      onTagDisable={handleDisable}
      breadcrumbs={breadcrumbs}
      titleImageTag={imageTag}
    />
  );
};

// CSS from UI Library
import "@fchh/fcos-suite-ui/style.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";

import { HorizontalNewsCardListView } from "@fchh/fcos-suite-ui";
import type { INews } from "@fchh/fcos-suite-ui";
import { useState } from "react";

interface Props {
  titleImage: string;
  titleImageAlt?: string;
  subtitle: string;
  title: string;
  cards: INews[];
  breadcrumbs?: Array<{ target?: string; title: string }>;
  imageTag?: string;
  pageSize?: number;
}

export const FilterableHorizontalNewsCardList = ({
  titleImage,
  titleImageAlt,
  subtitle,
  title,
  cards,
  breadcrumbs,
  imageTag,
  pageSize = 10
}: Props) => {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const categoryTitles: string[] = Array.from(
    new Set(cards.map((card) => card.category?.title))
  ).filter(Boolean);

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

  // Pagination logic

  const searchParams = new URLSearchParams(window.location.search);
  const currentPageRaw = searchParams.get("page") ?? "1";

  let start = 1;
  let end = pageSize;
  let nextLink;
  let previousLink;
  const totalPages = Math.ceil(filteredCards.length / pageSize);

  if (currentPageRaw) {
    const currentPage = parseInt(currentPageRaw, 10);
    if (!isNaN(currentPage)) {
      console.log({ totalPages, currentPage, length: filteredCards.length });
      start = pageSize * (currentPage - 1) + 1;
      end =
        pageSize * currentPage > filteredCards.length
          ? filteredCards.length
          : pageSize * currentPage;

      nextLink =
        currentPage + 1 > totalPages ? undefined : `?page=${currentPage + 1}`;
      previousLink =
        currentPage - 1 < 1 ? undefined : `?page=${currentPage - 1}`;
      console.log({ nextLink, previousLink });
    }
  }

  const paginatedCards = filteredCards.slice(start - 1, end);

  return (
    <HorizontalNewsCardListView
      titleImage={titleImage}
      titleImageAlt={titleImageAlt}
      subtitle={subtitle}
      title={title}
      cards={paginatedCards}
      tags={allCategories}
      activeTags={activeCategories}
      onTagEnable={handleEnable}
      onTagDisable={handleDisable}
      breadcrumbs={breadcrumbs}
      titleImageTag={imageTag}
      paginationEnd={end}
      paginationOverall={filteredCards.length}
      paginationStart={start}
      nextHref={nextLink}
      previousHref={previousLink}
    />
  );
};

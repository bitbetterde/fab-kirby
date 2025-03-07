import React from "react";
import { YoutubeEmbed } from "@fchh/fcos-suite-ui";

interface YoutubeEmbedBlockProps {
  block: {
    content: {
      embedid: string;
    };
  };
}

const YoutubeEmbedBlock: React.FC<YoutubeEmbedBlockProps> = ({ block }) => {
  if (!block || !block.content) return null;

  return <YoutubeEmbed embedId={block.content.embedid} />;
};

export default YoutubeEmbedBlock;

import React from "react";
import { ActionBox } from "@fchh/fcos-suite-ui";

interface ActionBoxBlockProps {
  block: {
    content: {
      title: string;
      description: string;
      buttons?: { caption: string; target: string }[];
    };
  };
}

const ActionBoxBlock: React.FC<ActionBoxBlockProps> = ({ block }) => {
  if (!block || !block.content) return null;

  const { title, description, buttons } = block.content;

  return (
    <ActionBox title={title} description={description}>
      {buttons?.map((button, index) => (
        <a key={index} href={button.target}>
          {button.caption}
        </a>
      ))}
    </ActionBox>
  );
};
export default ActionBoxBlock;

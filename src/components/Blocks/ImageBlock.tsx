import React from "react";

const ImageBlock = ({ block }) => {
  if (!block || !block.content) return null;

  const { image, caption, alt, credits } = block.content;

  return (
    <div>
      {image && <img src={image} alt={alt} />}
      {caption && <p>{caption}</p>}
      {credits && <p>{credits}</p>}
    </div>
  );
};

export default ImageBlock;

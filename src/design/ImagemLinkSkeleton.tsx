import React from "react";
import ContentLoader from "react-content-loader";

function ImagemLinkSkeleton() {
  return (
    <ContentLoader
      uniqueKey="imagemLinkSkeleton"
      className="rounded-md w-full h-80"
    >
      <rect width="100%" height="100%" />
    </ContentLoader>
  );
}

export default ImagemLinkSkeleton;

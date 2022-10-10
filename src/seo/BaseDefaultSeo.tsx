import { DefaultSeo } from "next-seo";
import { APP_DESCRIPTION, APP_TITLE } from "@src/common/CommonUtils";
import React from "react";

function BaseDefaultSeo() {
  const title = APP_TITLE;

  return (
    <DefaultSeo
      defaultTitle={title}
      titleTemplate={`%s | ${APP_TITLE}`}
      description={APP_DESCRIPTION}
      openGraph={{
        type: "website",
        title,
        description: APP_DESCRIPTION,
        site_name: APP_TITLE,
        locale: "pt_BR",
      }}
    />
  );
}

export default BaseDefaultSeo;

import classNames from "classnames";
import React from "react";

type SecaoProps = React.ComponentPropsWithRef<"section"> & {
  title: string;
  titleAs: keyof Pick<
    JSX.IntrinsicElements,
    "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  >;
  hideTitle?: boolean;
  headerActions?: React.ReactNode;
  headerClassName?: string;
};

const Secao = React.forwardRef<React.ComponentRef<"section">, SecaoProps>(
  function Secao(
    {
      title,
      titleAs,
      hideTitle,
      headerActions,
      headerClassName,
      children,
      ...rest
    },
    ref
  ) {
    const Heading = titleAs;

    return (
      <section ref={ref} {...rest}>
        <header
          className={classNames(
            hideTitle && "sr-only",
            "flex items-center justify-between text-text-light",
            headerClassName
          )}
        >
          <Heading className="font-semibold text-lg">{title}</Heading>
          {headerActions && <div>{headerActions}</div>}
        </header>
        {children}
      </section>
    );
  }
);

export default Secao;

import BackToTopButton from "./BackToTopButton";

type AppDesignnRootProps = React.PropsWithChildren<{}>;

function AppDesignnRoot({ children }: AppDesignnRootProps) {
  return (
    <>
      <div className="flex flex-col absolute inset-0">{children}</div>
      <BackToTopButton />
    </>
  );
}

export default AppDesignnRoot;

import AppConteudo from "./AppConteudo";
import AppRodape from "./AppRodape";
import AppTopo from "./AppTopo";
import AppDesignRoot from "./AppDesignRoot";

type AppDesignProps = React.PropsWithChildren<{}>;

function AppDesign({ children }: AppDesignProps) {
  return (
    <AppDesignRoot>
      <AppTopo />
      <AppConteudo>{children}</AppConteudo>
      <AppRodape />
    </AppDesignRoot>
  );
}

export default AppDesign;

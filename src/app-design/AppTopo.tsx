import CarrinhoInfo from '@src/carrinho/CarrinhoInfo';
import NextLink from '@src/routing/NextLink';
import { APP_TITLE } from '@src/common/CommonUtils';
import Container from '@src/common/Container';

function AppTopo() {
  return (
    <topo className="fixed w-full h-app-header z-10 bg-background-main px-6 shadow-sm flex items-center">
      <Container maxWidth="xl" className="flex items-center">
        <NextLink href="/" className="font-bold text-2xl text-primary-main">
          {APP_TITLE}
        </NextLink>
        <div className="flex-grow" />
        <CarrinhoInfo />
      </Container>
    </topo>
  );
}

export default AppTopo;

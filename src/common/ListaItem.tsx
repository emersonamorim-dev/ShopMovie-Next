import { motion } from "framer-motion";
import { useListaContext } from "./ListaContext";

type ListaItemProps = React.ComponentPropsWithoutRef<typeof motion.li>;

function ListaItem(props: ListaItemProps) {
  const { isAnimated } = useListaContext();

  return (
    <motion.li
      layout={isAnimated}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      {...props}
    />
  );
}

export default ListaItem;

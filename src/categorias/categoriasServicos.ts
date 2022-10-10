import dbJson from '@src/db/db.json';

export const categoriasServicos = {
  getManyCategorias: () => {
    return dbJson.categorias;
  },
};

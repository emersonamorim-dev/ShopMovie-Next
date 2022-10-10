import { StatusCodes } from 'http-status-codes';
import { createHandler } from '@src/api/ApiUtils';
import { Categorias } from '@src/categorias/CategoriasTipos';

export default createHandler<{ GET: Categorias[] }>({
  GET: (req, res) => {
    const response = req.servicos.categoriasServicos.getManyCategorias();
    res.status(StatusCodes.OK).json(response);
  },
});
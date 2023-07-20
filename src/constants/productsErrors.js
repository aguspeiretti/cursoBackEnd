export const productErrorIncompleteValues = (product) => {
  return `uno o mas parametros obligatorios no fueron proporcionados:ç
    propiedades obligatorias:
   title: se esperabauna cadena y se recibio${product.title},
    description:se esperabauna cadena y se recibio${product.description},
    code: se esperabauna cadena y se recibio:´${product.code}`;
};

export const productErrorAddProducts = () => {
  `No se pudo agregar el producto al carrito`;
};

export const productErrorDeleteProducts = () => {
  `No se pudo eliminar el producto `;
};

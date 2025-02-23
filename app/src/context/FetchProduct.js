import ax from "../conf/ax";

const fetchProducts = async (setProducts) => {
  try {
    const res = await ax.get(
      `/products?populate=image&populate=categories&populate=reviews&filters[stock][$gt]=0`,
    );
    setProducts(res.data.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export default fetchProducts;

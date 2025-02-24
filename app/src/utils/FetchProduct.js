import ax from "@/conf/ax";
import { endpoint } from "@/conf/main";

const fetchProducts = async (setProducts) => {
  try {
    const res = await ax.get(endpoint.public.product.query());
    setProducts(res.data.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export default fetchProducts;

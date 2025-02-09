import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import { useParams } from "react-router-dom";
import conf from "../conf/mainapi";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [images, setImages] = useState([]);
  const [selectColor, setSelectColor] = useState("");
  const [selectSize, setSelectSize] = useState("");
  const [selectQuantity, setSelectQuantity] = useState(1);

  const fetchProduct = async () => {
    try {
      const response = await ax.get(
        `/products?populate=image&populate=categories&filters[id]=${id}`
      );
      setProduct(response.data.data[0]);
      setSelectColor(response.data.data[0].color[0]);

      setSelectSize(response.data.data[0].size[0]);

      setImages(response.data.data[0].image);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddCart = () => {};

  if (!product) return <div>Loading...</div>;
  return (
    <div
      onMouseEnter={() => setAnimate(true)}
      onMouseLeave={() => setAnimate(false)}
      className="container mx-auto p-4"
    >
      <h1 className="text-2xl font-bold">{product.name}</h1>
      {images.map((image) => (
        <img
          key={image.id}
          src={`${conf.imageUrlPrefix}${image.url}`}
          alt={image.name}
          className={`w-64 h-44 object-cover rounded-sm transition-transform transform duration-500 ${
            animate ? "hover:scale-115" : ""
          }`}
        />
      ))}

      <p className="text-lg text-gray-600 mt-2">ราคา: {product.price} บาท</p>
      <p className="text-lg text-gray-600 mt-2">{product.soldCount} Solds</p>
      <p className="text-lg text-gray-600 mt-2">
        description: {product.description ? `${product.description}` : "null"}
      </p>

      {product.categories.map((category) => (
        <span className="text-lg text-gray-600 mt-2">
          tag[{category.title}]{" "}
        </span>
      ))}

      <div className="mt-4">
        <label className="block">เลือกสี:</label>
        <select
          value={selectColor}
          onChange={(e) => setSelectColor(e.target.value)}
          className="border p-2 rounded"
        >
          {product.color.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label className="block">เลือกไซส์:</label>
        <select
          value={selectSize}
          onChange={(e) => setSelectSize(e.target.value)}
          className="border p-2 rounded"
        >
          {product.size.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label className="block">จำนวน:</label>
        <input
          type="number"
          value={selectQuantity}
          onChange={(e) => setSelectQuantity(e.target.value)}
          min="1"
          max={product.stock}
          className="border p-2 rounded w-20"
        />
      </div>
    </div>
  );
};

export default ProductDetail;

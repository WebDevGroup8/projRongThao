import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPinned,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";

export const ExampleImg = ({ img, shoeName }) => {
  const [key, setKey] = useState(0);
  return (
    <div className="relative flex flex-col w-full lg:w-1/2 h-80 mt-2">
      {/* Shoe Name - Stays Above the Image on Mobile */}
      <p className=" mb-10 text-xl font-bold lg:text-white lg:absolute">
        {shoeName}
      </p>

      <div className="relative w-full lg:w-80 lg:flex-row flex justify-center lg:mb-5 lg:ml-10 lg:mt-10">
        {key > 0 && (
          <button
            className="lg:-start-18 t-0 absolute start-5 flex items-center h-full"
            onClick={() => setKey(key - 1)}
          >
            <ChevronLeft size={80} strokeWidth={2} className="text-gray-400 " />
          </button>
        )}
        <img
          src={img[key]}
          alt="รองเท้า"
          className="w-50 h-50 lg:w-80 lg:h-80 object-cover border-4 border-gray-300 rounded-2xl "
        />
        {key < img.length - 1 && (
          <button
            className="lg:-end-18 absolute end-5 top-1/2 -translate-y-1/2"
            onClick={() => setKey(key + 1)}
          >
            <ChevronRight
              size={80}
              strokeWidth={2}
              className="text-gray-400 "
            />
          </button>
        )}
      </div>

      <div className="w-full justify-start lg:ml-10 lg:mt-0 flex flex-row gap-3 mt-8 ">
        {img?.map((image, index) => (
          <button
            key={index}
            className="w-15 h-15 lg:h-fit object-cover border-2 border-gray-300 rounded-xl focus:ring-1 focus:outline-none focus:ring-black
          "
            onClick={() => setKey(index)}
          >
            <img
              src={image}
              alt="รองเท้า"
              className="w-fit h-fit object-cover rounded-xl"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export const Detail = ({ country, solds, price, disCountPrice, shoeName }) => {
  return (
    <div className="mt-12 flex flex-col lg:mt-0 lg:gap-2">
      <div className="lg:mb-7">
        <p className=" text-xl font-bold lg:text-black text-white lg:text-2xl">
          {shoeName}
        </p>
      </div>
      {/* Price & Discount */}
      <div className="flex flex-row gap-3 lg:py-0">
        <p className="text-3xl font-bold text-blue-950">{disCountPrice}฿</p>
        <p className="font-thin line-through">{price ? price + "฿" : ""}</p>
      </div>

      {/* Location & Sold Info */}
      <div className="flex flex-row gap-9 ">
        <div className="gap-2 flex flex-row">
          <MapPinned />
          <p>{country}</p>
        </div>
        <p>
          {solds} {solds <= 0 ? "sold" : "solds"}
        </p>
      </div>
    </div>
  );
};

export const Tag = ({ text }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {text?.map((text, index) => (
        <div className=" text-center w-fit p-3 py-1 rounded-md border-folid bg-blue-950">
          <p key={index} className="text-center text-white font-semibold">
            {text}
          </p>
        </div>
      ))}

      <p className="text-center text-white font-semibold">{text}</p>
    </div>
  );
};

export const Description = ({ description }) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  return (
    <div className="relative flex flex-col gap-2 text-center justify-center ">
      <hr className=" my-0 bg-primarydark border-1"></hr>
      <button
        type="button"
        onClick={() => setIsOpenDescription(!isOpenDescription)}
      >
        <div className="flex flex-row w-full hover:text-blue-600">
          <div className="w-full justify-center hover:underline">
            Description
          </div>
          {!isOpenDescription && <Plus />}
          {isOpenDescription && <Minus />}
        </div>
      </button>
      {isOpenDescription && <hr className=" my-0 bg-primarydark border-1"></hr>}

      {isOpenDescription && (
        <div className="flex flex-wrap w-fit text-left px-6 text-sm">
          {description.split("\n").map((line, index) => (
            <p key={index} className="mb-2">
              {line}
            </p>
          ))}
        </div>
      )}
      <hr className=" my-0 bg-primarydark border-1"></hr>
    </div>
  );
};

export default function ItemDetail() {
  const [IsOpenSize, setIsOpenSize] = useState(false);
  const [IsOpenColor, setIsOpenColor] = useState(false);
  const [size, setSize] = useState("Value");
  const [color, setColor] = useState("Value");

  return (
    <div className="space-y-5 h-full w-full flex-wrap p-10 lg:px-60 lg:py-12">
      <div className="lg:flex lg:flex-row lg:justify-between ">
        <div>
          <ExampleImg
            shoeName="Unisex สกอลล์ รุ่น Sprinter Plus"
            img={[
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD1cNiw_n7sItJoy44v8jclD11baK1HQGcB5mMHE_7P0dwtr72zg2fLeyd4dDYaKtMp0M&usqp=CAU",
              "https://image.makewebeasy.net/makeweb/m_1920x0/bAHmwaCEf/Content/what_is_safety_shoes.png",
              "https://mpics.mgronline.com/pics/Images/564000003615401.JPEG",
            ]}
          />
        </div>
        <div className="flex flex-col gap-5 lg:w-1/2">
          <Detail
            shoeName="Unisex สกอลล์ รุ่น Sprinter Plus"
            country="Bangkok Thailand"
            solds={2500}
            price={469}
            disCountPrice={399}
          />
          <Tag text={["รองเท้าผ้าใบ", "-15%"]} />

          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between gap-12">
              <div className="flex flex-col relative w-84 gap-y-2">
                <p>Size</p>
                <button
                  onClick={() => setIsOpenSize(!IsOpenSize)}
                  className="font-light text-black border-1 bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                >
                  {size}
                  <div className=" ms-auto">
                    <ChevronDown />
                  </div>
                </button>
                {IsOpenSize && (
                  <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 top-full mt-1">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      {["7", "7.5", "8.5", "9"].map((item, index) => (
                        <li key={index}>
                          <a
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => {
                              return setSize(item), setIsOpenSize(!IsOpenSize);
                            }}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative flex flex-col w-84 gap-y-2">
                <p>Colors</p>
                <button
                  onClick={() => setIsOpenColor(!IsOpenColor)}
                  class="font-light text-black border-1 bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                >
                  {color}

                  <div className=" ms-auto">
                    <ChevronDown />
                  </div>
                </button>
                {IsOpenColor && (
                  <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 top-full mt-1">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      {["Black", "White", "Blue"].map((item, index) => (
                        <li key={index}>
                          <a
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => {
                              return (
                                setColor(item), setIsOpenColor(!IsOpenColor)
                              );
                            }}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-5 w-full">
              <button className="text-white text-center text-xl px-4 py-2 rounded-md bg-blue-950 w-full">
                <p className="hover:underline">ADD TO CART</p>
              </button>
              <button className="text-white text-center text-xl px-4 py-2 rounded-md bg-black">
                <p className="hover:underline">BUY IT NOW</p>
              </button>
            </div>

            <Description
              description="Unisex Scholl Sprinter Plus – Comfort Meets Style
✔ Breathable Design – Made with a lightweight mesh upper for maximum airflow, keeping your feet cool and dry all day.

✔ All-Day Comfort – Features a cushioned insole and shock-absorbing midsole to reduce strain on your feet and joints.

✔ Slip-Resistant Grip – The durable rubber outsole provides excellent traction on various surfaces, ensuring stability and safety.

✔ Versatile & Stylish – A sleek, modern design that pairs effortlessly with any casual or sporty outfit.

✔ Perfect for Any Activity – Whether you're walking, running errands, or hitting the gym, the Sprinter Plus offers the ideal blend of comfort, durability, and support.

"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

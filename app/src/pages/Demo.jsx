import { AlignJustify } from "lucide-react";

export default function Demo() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* Navbar */}
      <div className="flex flex-row bg-cyan-900 w-full h-20 px-12 items-center justify-between md:h-28 md:px-24 lg:px-48 lg:h-24">
        <p className="text-white text-xl font-bold md:text-3xl">RongThao</p>
        <AlignJustify className="text-white md:size-12" />
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col mt-4 lg:px-[40vh] ">
        <img
          src="https://cdn.thewirecutter.com/wp-content/media/2024/11/runningshoes-2048px-09522.jpg?auto=webp&quality=75&width=1024"
          alt="demo"
          className="w-full h-80 object-cover px-12 md:px-24 md:h-120 lg:h-96 "
        />
        <div className="px-12 mt-6 md:px-24">

        <p className="text-base font-bold md:text-3xl lg:text-2xl ">ADIDAS</p>
        <p className="text-base md:text-3xl md:mt-2 lg:text-2xl">Adidas รุ่นใหม่ไฟแรง สีเขียวน้ำตาล</p>
        <p className="text-base text-red-600 font-semibold md:text-3xl md:mt-4 lg:text-2xl">$1900</p>
        <p className="text-base text-gray-700 font-light mt-2 md:text-3xl md:mt-6 lg:text-xl">จัดจำหน่ายโดย RongThao</p>
        <p className="text-sm mt-7 md:text-2xl md:mt-14 lg:text-xl"> <strong>Size</strong> : UK8</p>
        <div className="flex flex-wrap mt-4 gap-4 md:text-2xl lg:text-xl">
            <div className="px-3 py-1.5 border-1 border-gray-700 ">UK 7</div>
            <div className="px-3 py-1.5 border-1 border-gray-700 ">UK 7.5</div>
            <div className="px-3 py-1.5 border-1 border-gray-700 ">UK 8</div>
            <div className="px-3 py-1.5 border-1 border-gray-700 bg-black text-white ">UK 8.5</div>
            <div className="px-3 py-1.5 border-1 border-gray-700 ">UK 9</div>
            <div className="px-3 py-1.5 border-1 border-gray-700 ">UK 10</div>
            <div className="px-3 py-1.5 border-1 border-gray-700 ">UK 11.5</div>
        </div>
        <div className="flex flex-row mt-6 w-full md:text-3xl lg:text-xl mb-80">
            <div className="bg-cyan-900 text-white font-bold w-full text-center py-3">
                สั่งซื้อตอนนี้
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}

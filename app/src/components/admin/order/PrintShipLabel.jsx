import { Printer } from "lucide-react";
import React from "react";
import dayjs from "dayjs";

const PrintShipLabel = ({ order }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) {
      return alert("Popup ถูกบล็อก! กรุณาอนุญาตให้เว็บไซต์เปิด popup");
    }

    printWindow.document.open();
    printWindow.document.write(`
          <html>
            <head>
              <title>พิมพ์ใบขนส่ง</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .box { border: 1px dashed black; padding: 15px; margin-bottom: 10px; background: white; }
                h2, p { margin: 5px 0; }
              </style>
            </head>
            <body>
              <div class="box">
                <h2>📦 RongThao - ใบเสร็จการขนส่ง</h2>
                <hr/>
                <p><strong>หมายเลขคำสั่งซื้อ:</strong> ${order.documentId}</p>
                <p><strong>ชื่อผู้รับ:</strong> ${order.owner?.username}</p>
                <p><strong>ที่อยู่:</strong> ${order.address}</p>
                <hr/>
                <p><strong>รายการสินค้า:</strong></p>
                  ${order.order_product.map((product) => `<p>🔹 ${product.name}</p>`).join("")}
                <hr/>
                <p><strong>วันที่สั่งซื้อ:</strong> ${dayjs(order.createdAt).format("DD MMM YYYY")}</p>
                <p><strong>สถานะคำสั่งซื้อ:</strong> ${order.orderStatus}</p>
                <br/>
                <p>ขอบคุณที่ใช้บริการ 🙏</p>
              </div>
              <script>
                window.onload = function() { 
                  window.print(); 
                  window.onafterprint = function() { window.close(); };
                }
              </script>
            </body>
          </html>
        `);
    printWindow.document.close();
  };

  return (
    <Printer
      size={40}
      onClick={handlePrint}
      className="cursor-pointer rounded-lg p-2 text-blue-500 transition-all duration-200 hover:bg-blue-100 hover:text-blue-700"
    />
  );
};

export default PrintShipLabel;

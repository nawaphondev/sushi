import { thaiDateFormat } from "@/lib/utils";

export const PaymentColumns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "paymentDate",
    header: "วันที่ชำระ",
    cell: ({ row }) => thaiDateFormat(row.getValue("paymentDate")),
  },
  {
    accessorKey: "amount",
    header: "ยอดที่ชำระ",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("th-TH").format(amount);
      return <div className="font-medium">{formatted} บาท</div>;
    },
  },
  {
    accessorKey: "method",
    header: "วิธีชำระ",
  },
  {
    accessorKey: "status",
    header: "สถานะ",
  },
];

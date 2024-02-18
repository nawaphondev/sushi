import SimpleBar from "@/components/charts/SimpleBar";
import SimpleBarHorizontal from "@/components/charts/SimpleBarHorizontal";
import OrderTable from "@/components/tables/OrderTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="grid justify-between grid-cols-3 gap-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between text-[#8B8E99] text-lg">
              รายได้รวม
              <div className="flex gap-2 text-sm font-light">
                <div>profit</div>
                <div>loss</div>
              </div>
            </CardTitle>
            <CardDescription className="text-2xl text-black font-regular">
              200,000 <span className="text-green-500">5% than last mount</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBar />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between text-[#8B8E99] text-lg">
              สินค้าที่ขายมากที่สุด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarHorizontal />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex justify-between text-[#8B8E99] text-lg">
              คำสั่งซื้อล่าสุด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

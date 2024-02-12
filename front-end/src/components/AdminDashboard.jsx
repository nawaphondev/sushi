export default function AdminDashboard() {
  return (
    <div className='flex flex-col gap-y-2'>
      <div className='grid justify-between grid-cols-3 gap-2'>
        <div className='flex justify-between h-full p-2 bg-white rounded-md'>
          <div className='flex flex-col items-start justify-between'>
            <h2 className="text-[#8B8E99]">ยอดขายวันนี้</h2>
            <div>100,999</div>
            <div>ขายไปแล้ว 123 รายการ</div>
          </div>
          <div>circle</div>
        </div>
        <div className='flex justify-between h-full p-2 bg-white rounded-md'>
          <div className='flex flex-col items-start justify-between'>
            <h2 className="text-[#8B8E99]">รายได้วันนี้</h2>
            <div>100,999</div>
            <div>กำไรที่ทำวันนี้จนถึงตอนนี้</div>
          </div>
          <div>circle</div>
        </div>
        <div className='flex justify-between h-full p-2 bg-white rounded-md'>
          <div className='flex flex-col items-start justify-between'>
            <h2 className="text-[#8B8E99]">จำนวนผู้ใช้</h2>
            <div>100,999</div>
            <div>ผู้ใช้ทั้งหมดที่ลงทะเบียนกับ devphone</div>
          </div>
          <div>circle</div>
        </div>
        <div className='flex flex-col h-full col-span-2 p-2 bg-white rounded-md'>
          <div className='flex flex-row items-center justify-between'>
            <h2 className="text-[#8B8E99]">รายได้รวม</h2>
            <div className="flex gap-2">
              <div>profit</div>
              <div>loss</div>
            </div>
          </div>
          <div className="flex gap-2">
            <div>200,000</div>
            <div>5% than last mount</div>
          </div>
          <div>
            graph
          </div>
        </div>
        <div className='flex flex-col justify-between h-full p-2 bg-white rounded-md'>
          <h2 className="text-[#8B8E99]">สินค้าที่ขายมากที่สุด</h2>
          <div>graph</div>
        </div>
        <div className="flex flex-col justify-between h-full col-span-3 p-2 bg-white rounded-md">
          <h2 className="text-[#8B8E99]">คำสั่งซื้อล่าสุด</h2>
          list
        </div>
      </div>
    </div>
  )
}

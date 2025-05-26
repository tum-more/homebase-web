import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-gray-200 py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <div>
                  <Image
                    src="/images/rental/homebase-rental-top.png"
                    width={600}
                    height={400}
                    alt="HOMEBASE RENTAL"
                    className="w-full rounded-lg object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="flex items-center justify-center h-full">
                <Image
                  src="/images/rental/homebase-rental-bike.jpg"
                  width={600}
                  height={400}
                  alt="HOMEBASE EV มอเตอร์ไซค์ไฟฟ้า สำหรับธุรกิจที่ต้องการความรวดเร็วและความยืดหยุ่น"
                  className="w-full rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pt-6 pb-12">
          <div className="container mx-auto px-4">
            <div className="my-4">
              <p className="text-lg font-medium text-[#FF4500]">
                พิเศษ! มีโอกาสเป็นเจ้าของมอเตอร์ไซค์ไฟฟ้า เมื่อเช่าครบตามระยะเวลาและเงื่อนไขที่กำหนด
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Card 1 */}
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium">บริการรูปแบบที่ 1</h3>
                <h4 className="mt-2 text-xl font-bold">รถจักรยานยนต์ไฟฟ้าพร้อมคนขับ</h4>

                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF4500]">•</span>
                    <span>รถจักรยานยนต์ไฟฟ้าใหม่ พร้อมส่งมอบ</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF4500]">•</span>
                    <span>พนักงานขับขี่ประจำ 26 วัน/เดือน (09:00–18:00 น.)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF4500]">•</span>
                    <span>สำรองพนักงานขับขี่ กรณีพนักงานหลักไม่สามารถปฏิบัติงาน</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF4500]">•</span>
                    <span>จัดหารถสำรองกรณีรถเข้าซ่อมเกิน 1 วัน</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF4500]">•</span>
                    <span>บริการประสานงานและดูแลตลอด 24 ชั่วโมง</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF4500]">•</span>
                    <span>พนักงานขับขี่จัดการหาที่จอดรถ ลูกค้าไม่ต้องจัดหาเอง</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="pb-2 text-left text-sm font-medium text-[#FF4500]">จำนวน</th>
                        <th className="pb-2 text-right text-sm font-medium text-[#FF4500]">ราคา (บาท)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 text-left">1 - 10 คัน</td>
                        <td className="py-3 text-right">27,600.-</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-left">11 - 20 คัน</td>
                        <td className="py-3 text-right">26,700.-</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-left">21 - 50 คัน</td>
                        <td className="py-3 text-right">26,000.-</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-left">51 คันขึ้นไป</td>
                        <td className="py-3 text-right">25,200.-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    href="https://airtable.com/appgH4qvxo7KOIVYU/pagadvN0pryN7rwLK/form"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-[#FF4500] px-6 py-2 text-sm font-medium text-white"
                  >
                    ขอใบเสนอราคา
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium">บริการรูปแบบที่ 2</h3>
                <h4 className="mt-2 text-xl font-bold">รถจักรยานยนต์ไฟฟ้า</h4>

                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF4500]">•</span>
                    <span>รถจักรยานยนต์ไฟฟ้าใหม่ พร้อมส่งมอบ</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF4500]">•</span>
                    <span>จัดหารถสำรองกรณีรถเข้าซ่อมเกิน 1 วัน</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF4500]">•</span>
                    <span>บริการประสานงานและดูแลตลอด 24 ชั่วโมง</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF4500]">•</span>
                    <span>ลูกค้าจัดหาที่จอดรถเอง</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="pb-2 text-left text-sm font-medium text-[#FF4500]">จำนวน</th>
                        <th className="pb-2 text-right text-sm font-medium text-[#FF4500]">ราคา (บาท)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 text-left">1 - 10 คัน</td>
                        <td className="py-3 text-right">9,600.-</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-left">11 - 20 คัน</td>
                        <td className="py-3 text-right">9,300.-</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-left">21 - 50 คัน</td>
                        <td className="py-3 text-right">9,000.-</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-left">51 คันขึ้นไป</td>
                        <td className="py-3 text-right">8,700.-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    href="https://airtable.com/appgH4qvxo7KOIVYU/pagadvN0pryN7rwLK/form"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-[#FF4500] px-6 py-2 text-sm font-medium text-white"
                  >
                    ขอใบเสนอราคา
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">ตารางเปรียบเทียบ</h2>

            <div className="overflow-x-auto md:mx-auto md:max-w-[900px]">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4 text-sm font-medium">รายการบริการ</th>
                    <th className="pb-4 text-center text-sm font-medium">
                      รถจักรยานยนต์ไฟฟ้า
                      <br />
                      พร้อมคนขับ
                    </th>
                    <th className="pb-4 text-center text-sm font-medium">รถจักรยานยนต์ไฟฟ้า</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-orange-100 transition-colors duration-150">
                    <td className="py-2 text-sm">รถจักรยานยนต์ไฟฟ้าใหม่</td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-100 transition-colors duration-150">
                    <td className="py-2 text-sm">พนักงานขับขี่ประจำ (26 วัน/เดือน)</td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                    <td className="py-2 text-center"></td>
                  </tr>
                  <tr className="hover:bg-orange-100 transition-colors duration-150">
                    <td className="py-2 text-sm">พนักงานขับขี่สำรอง</td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                    <td className="py-2 text-center"></td>
                  </tr>
                  <tr className="hover:bg-orange-100 transition-colors duration-150">
                    <td className="py-2 text-sm">รถสำรองกรณีซ่อมนาน</td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-100 transition-colors duration-150">
                    <td className="py-2 text-sm">ทีมประสานงาน 24 ชั่วโมง</td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-100 transition-colors duration-150">
                    <td className="py-2 text-sm">จัดการหาที่จอดให้</td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-100 transition-colors duration-150">
                    <td className="py-2 text-sm">ประกันภัยชั้นหนึ่ง</td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-100 transition-colors duration-150">
                    <td className="py-2 text-sm">บำรุงรักษาและซ่อมบำรุงครบวงจร</td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                    <td className="py-2 text-center">
                      <Check className="mx-auto h-5 w-5 text-gray-600" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-2 text-center text-3xl font-bold">ความสะดวกสบาย</h2>
            <p className="mb-8 text-center text-sm">ที่คุณเลือกได้</p>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Benefit 1 */}
              <div className="overflow-hidden rounded-lg bg-white p-4 shadow">
                <div className="mb-4 h-40 overflow-hidden rounded-lg">
                  <Image
                    src="/images/rental/homebase-rental-easy-charge.jpg"
                    width={300}
                    height={160}
                    alt="ชาร์จง่าย"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-center text-xl font-bold text-[#FF4500]">ชาร์จง่าย</h3>
                <p className="text-center text-sm">ใช้ได้ทั่วไป สะดวกทุกที่</p>
              </div>

              {/* Benefit 2 */}
              <div className="overflow-hidden rounded-lg bg-white p-4 shadow">
                <div className="mb-4 h-40 overflow-hidden rounded-lg">
                  <Image
                    src="/images/rental/homebase-rental-travel-long-distant.jpg"
                    width={300}
                    height={160}
                    alt="การเดินทาง"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-center text-xl font-bold text-[#FF4500]">การเดินทาง</h3>
                <p className="text-center text-sm">วิ่งได้ถึง 200km/ครั้ง</p>
              </div>

              {/* Benefit 3 */}
              <div className="overflow-hidden rounded-lg bg-white p-4 shadow">
                <div className="mb-4 h-40 overflow-hidden rounded-lg">
                  <Image
                    src="/images/rental/homebase-rental-hot-swap.jpg"
                    width={300}
                    height={160}
                    alt="แบตเตอรี่"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-center text-xl font-bold text-[#FF4500]">แบตเตอรี่</h3>
                <p className="text-center text-sm">เปลี่ยนเพียง 5-10 นาที</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="py-8 text-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
            <div>
              <div className="mb-2 font-bold uppercase">HOMEBASE</div>
              <p className="text-xs text-gray-400">Powered by Morestudio</p>
              <div className="mt-4">
                <Image
                  src="/images/rental/homebase-rental-inquiry-qr.jpg"
                  width={100}
                  height={100}
                  alt="QR Code"
                  className="rounded-lg bg-white p-1"
                />
              </div>
            </div>
            <div className="text-right text-sm w-full md:w-auto self-end mt-auto md:self-end">
              <div className="mb-2">Contact us</div>
              <div className="text-gray-400">line: 02 619 8457</div>
              <div className="text-gray-400">อีเมล: HomeBase@morestudio.co.th</div>
              <div className="text-gray-400">เว็บไซต์: https://www.homebaseth.com</div>
              <div className="mt-2 text-gray-400">HomeBase EV – โซลูชันที่ตอบโจทย์ธุรกิจของคุณ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

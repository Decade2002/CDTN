import Image from "next/image";

export default function Introduction() {
  return (
    <section className="bg-gray-100 py-12 ml-7">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-5">
            Cung Cấp Dịch Vụ Chăm Sóc{" "}
            <span className="text-teal-600">Sức Khỏe</span> Một Cách{" "}
            <span className="text-teal-600">Nhiệt Tình</span> Và{" "}
            <span className="text-teal-600">Chu Đáo</span> Vì Một Tương Lai Tươi Sáng Đang Chờ Đợi Chúng Ta
          </h1>
          <p className="text-gray-700 mb-7 text-base max-w-2xl">
            Tại Bệnh Viện Của Chúng Tôi, Chúng Tôi Luôn Tận Tâm Cung Cấp Dịch Vụ Chăm Sóc Y Tế Đặc Biệt Cho Bệnh Nhân Và Gia Đình Của Họ. Đội Ngũ Chuyên Gia Y Tế Giàu Kinh Nghiệm, Công Nghệ Tiên Tiến Và Sự Thấu Hiểu Nỗi Lòng Bệnh Nhân Giúp Chúng Tôi Trở Thành Đơn Vị Dẫn Đầu Trong Ngành Y Tế
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#"
              className="px-7 py-3 bg-teal-700 text-white font-bold rounded-lg shadow hover:bg-teal-800 transition"
            >
              Lịch Hẹn
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center relative hidden lg:flex">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <Image 
              src="/Vector.png"
              alt="Vector"
              width={380}
              height={380}
              className="mb-20"
            />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 z-10">
            <Image
              src="/doctor.png"
              alt="Bác sĩ"
              width={300}
              height={350}
              priority
              className="object-contain w-[210px] h-[280px] md:w-[270px] md:h-[340px] lg:w-[300px] lg:h-[350px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
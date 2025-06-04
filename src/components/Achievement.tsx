import Image from "next/image";

export default function Achievement() {
  return (
    <section className="bg-gray-100 py-12">
      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-teal-700 text-center mb-8">
          Thành quả đã đạt được
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
          <div className="flex-1 text-center">
            <div className="text-3xl md:text-4xl font-bold text-teal-700 mb-1">99%</div>
            <div className="text-gray-700 font-medium">Sự hài lòng của khách hàng</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-3xl md:text-4xl font-bold text-teal-700 mb-1">15k</div>
            <div className="text-gray-700 font-medium">Số bệnh nhân</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-3xl md:text-4xl font-bold text-teal-700 mb-1">12k</div>
            <div className="text-gray-700 font-medium">Số bệnh nhân đã hồi phục</div>
          </div>
        </div>
        {/* Why choose us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-teal-700 mb-2">
              Vì sao bạn nên đến với chúng tôi
            </h3>
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
              pharellus mollis sit aliquam sit nullam.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="px-7 py-2 bg-teal-700 text-white font-semibold rounded-full shadow hover:bg-teal-800 transition text-center"
              >
                Bắt đầu
              </a>
              <a
                href="#"
                className="px-7 py-2 bg-white border border-gray-300 text-teal-700 font-semibold rounded-full shadow hover:bg-gray-100 transition text-center"
              >
                Liên hệ với tiếp viên
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="rounded-xl overflow-hidden shadow-md w-full max-w-md">
              <Image
                src="/operation.png"
                alt="Bệnh viện ca mổ"
                width={420}
                height={280}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
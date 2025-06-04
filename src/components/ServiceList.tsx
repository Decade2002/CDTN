import Image from "next/image";

const services = [
  {
    title: "Răng miệng",
    desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    img: "/dental.png",
    alt: "Răng miệng",
  },
  {
    title: "Xương cốt",
    desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    img: "/orthopedic.png",
    alt: "Xương cốt",
  },
  {
    title: "Chuẩn đoán",
    desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    img: "/diagnosis.png",
    alt: "Chuẩn đoán",
  },
  {
    title: "Tim mạch",
    desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    img: "/cardiology.png",
    alt: "Tim mạch",
  },
  {
    title: "Phẫu thuật",
    desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    img: "/surgery.png",
    alt: "Phẫu thuật",
  },
  {
    title: "Mắt mũi",
    desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    img: "/eye.png",
    alt: "Mắt mũi",
  },
];

export default function ServiceList() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-teal-700 text-center mb-2">
          Dịch vụ mà chúng tôi cung cấp
        </h2>
        <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-xl shadow-sm p-5 flex flex-col h-full">
              <div className="relative w-full h-36 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={service.img}
                  alt={service.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 330px, (min-width: 768px) 48vw, 95vw"
                />
              </div>
              <h3 className="font-semibold text-lg text-teal-700 mb-1">{service.title}</h3>
              <p className="text-gray-700 text-sm flex-1 mb-4">{service.desc}</p>
              <a
                href="#"
                className="text-teal-700 font-semibold text-sm mt-auto flex items-center gap-1 hover:underline"
              >
                Tìm hiểu thêm
                <svg
                  className="w-4 h-4 inline-block ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
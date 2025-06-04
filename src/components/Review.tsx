import Image from "next/image";

const testimonials = [
  {
    img: "/donald.png",
    quote: "An amazing service",
    text: "Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc mauris scelerisque sed egestas.",
    name: "Donald Trump",
    title: "Tổng thống hoa kì",
    link: "#",
    color: "text-teal-700"
  },
  {
    img: "/zuck.png",
    quote: "One of a kind service",
    text: "Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc mauris scelerisque sed egestas.",
    name: "Mark Zuckerberg",
    title: "CEO của Facebook",
    link: "#",
    color: "text-teal-700"
  },
  {
    img: "/khabanh.png",
    quote: "Quá tuyệt vời",
    text: "Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc mauris scelerisque sed egestas.",
    name: "Khá Bảnh",
    title: "Giang hồ mạng",
    link: "#",
    color: "text-teal-700"
  }
];

export default function Review() {
  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-teal-700 text-center mb-2">
          Đánh giá từ khách hàng trung thành
        </h2>
        <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-gray-200">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="font-semibold text-lg mb-2">&ldquo;{item.quote}&rdquo;</div>
              <div className="text-gray-700 text-sm mb-4">{item.text}</div>
              <a href={item.link} className={`${item.color} font-semibold hover:underline`}>
                {item.name}
              </a>
              <div className="text-gray-500 text-xs">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
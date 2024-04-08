import ContactForm from "../components/forms/ContactForm";

export default function AboutPage() {
  return (
    <div className="flex items-center justify-center flex-grow w-8/12 mx-auto">
      <div className="flex items-center justify-center rounded-lg shadow-2xl h-fit">
        <div className='p-12 rounded-lg flex flex-col min-w-[491px] min-h-[647px] bg-[url("/about.png")] bg-contain bg-no-repeat justify-between'>
          <div className="gap-2">
            <h1 className="text-4xl font-medium text-white">
              ช่องทางติดต่อเรา
            </h1>
            <div className="font-medium text-[#C9C9C9]">
              เขียนข้อความถึงเราได้เลย
            </div>
          </div>
          <div className="grid items-center justify-center grid-cols-2 gap-12 w-min">
            <img src="./phone.svg" alt="" className="min-w-5" />
            <div className="text-white text-nowrap">+66 82 837 3964</div>
            <img src="./mail.svg" alt="" className="min-w-5" />
            <div className="text-white">devphone@gmail.com</div>
            <img src="./pin.svg" alt="" className="min-w-5" />
            <div className="text-white text-nowrap">
              IT, Rajabhat maha sarakham
            </div>
          </div>
          <div className="flex items-start justify-around">
            <img src="/facebook.svg" alt="" />
            <img src="/instagram.svg" alt="" />
            <img src="/youtube.svg" alt="" />
            <img src="/twitter.svg" alt="" />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

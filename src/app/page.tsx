import { CiCloudOn } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa6";
import { BsWindowFullscreen } from "react-icons/bs";
import { CalendarAmostra } from "@/components/calendarAmostra";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center mt-4 min-h-[calc(100vh-180px)] w-full">
      <h2 className="font-medium text-3xl text-center my-2 md:text-4xl">Organize sua rotina de forma simples e rápida.</h2>
      <p className="text-center text-gray-700 md:text-2xl mb-5">Vizualize, lembre e organize sua agenda pessoal <br /> de maneira eficiente.</p>

      <section className="flex flex-col items-center my-5 gap-4 md:flex-row justify-center md:gap-9">
        <div className="flex flex-col items-center h-30 gap-4 bg-blue-500 px-3 justify-center py-4 w-72 rounded-md md:h-70 hover:scale-120 duration-300">
          <div className="flex items-center gap-2">
            <BsWindowFullscreen size={24} color="#FFFFFF" />
            <p className="text-white font-medium">Interface limpa e intuitiva</p>
          </div>
          <div className="flex items-center gap-2">
            <FaRegBell size={24} color="#FFFFFF" />
            <p className="text-white font-medium">Lembretes e organização</p>
          </div>
          <div className="flex items-center gap-2">
            <CiCloudOn size={24} color="#FFFFFF" />
            <p className="text-white font-medium">Acesso de qualquer lugar</p>
          </div>
        </div>

          <CalendarAmostra/>

      </section>
    </main>
  );
}

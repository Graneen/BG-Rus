import { Specialist } from "../pages/buyerPage/buyerPage";
import { Card } from "flowbite-react";

interface BuyerProfileProps {
  
specialist: Specialist;
  handleBookSpecialist: (specialistId: number) => void;
}

export function BuyerProfile({ specialist, handleBookSpecialist }: BuyerProfileProps) {
  return (
    <Card className="max-w-sm bg-[#FBD784]">
      <div className="flex justify-end px-4 pt-4">
      </div>
      <div className="flex flex-col items-center pb-10">
      <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={specialist.photo} alt="Profile image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{`${specialist.firstName} ${specialist.lastName}`}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Пересылает из: {specialist.country}</span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <a
            onClick={handleBookSpecialist.bind(null, specialist.id)}
            className="cursor-pointer inline-flex items-center rounded-lg bg-[#0B1D26ff] px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Попросить связаться со мной
          </a>
        </div>
      </div>
    </Card>
  );
}

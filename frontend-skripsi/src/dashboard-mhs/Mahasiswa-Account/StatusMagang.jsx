
import StatusList from "../../components/Mahasiswa-Components/Status-Magang/StatusList";
const StatusMagang = () => {
  return (
    <div className="container">
      <h2 className="text-[36px] font-[800] text-blackColor">Status Magang</h2>
      <div className="border-b border-gray-900/10 pb-2"></div>
      <div
        className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
        data-aos="fade-right"
      >
        {/* Tabs buttons */}
        <StatusList />
      </div>
    </div>
  );
};

export default StatusMagang;

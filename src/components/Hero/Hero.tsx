import Searchbar from "./Searchbar/Searchbar";
import Logo from "../../assets/logo.png";

export default function Hero() {
  return (
    <div className="h-96 ">
      <div className="mt-52">
        <h1 className="text-center text-7xl mb-10 text-[#ffb7c5]">
          <img className="w-96 m-auto" src={Logo} alt="" />
        </h1>
        <Searchbar />
      </div>
    </div>
  );
}

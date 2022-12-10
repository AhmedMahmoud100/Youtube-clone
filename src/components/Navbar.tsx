import {useState} from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAppsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeSearchTerm, clearSearchTerm, clearVideos } from "../store";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";
import { showMenu } from "../store";
import {AiOutlineArrowLeft} from "react-icons/ai"
export default function Navbar() {
  const [search,setsearch] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);
  
 function handleMenu(){
   dispatch(showMenu())
  
  }

  const handleSearch = () => {
    if (location.pathname !== "/search") navigate("/search");
    else {
      dispatch(clearVideos());
      dispatch(getSearchPageVideos(false));
    }
  };

  return (
    <div className="flex justify-between items-center  px-3 sm:px-14 h-14 bg-[#212121] opacity-95 sticky top-0 z-50">
      <div className={search ? "hidden" : "flex gap-4 items-center text-2xl sm:gap-8"}>
        <div>
          <GiHamburgerMenu onClick={handleMenu}/>
        </div>
        <Link to="/">
          <div className="flex gap-1 items-center justify-center">
            <BsYoutube className="text-3xl text-red-600" />
            <span className="text-xl font-medium px-1 sm:pd-3">YouTube</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-0 sm:gap-5">
        <div className=" w-10 h-10  hover:bg-gray-300 rounded-full flex items-center hover:text-black justify-center">
        <AiOutlineArrowLeft className={search ?"visible text-2xl   cursor-pointer " : "hidden"} onClick={() => setsearch(false)}/>
        </div>
      
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if(searchTerm != '') handleSearch();
          }}
        >
          <div className="flex bg-zinc-900 items-center h-10 px-0 sm:pl-4 pr-0 ml-4 ">
           
            <div className={search ?"flex gap-4 items-center pr-5 flex-1  " :"flex gap-4 items-center pr-5 flex-1 hidden sm:flex"}>
              <div>
                <AiOutlineSearch className="text-xl" />
              </div>
              <input
                type="text"
                className="w-full bg-zinc-900 focus:outline-none border-none"
                value={searchTerm}
                onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
              />

              <AiOutlineClose
                className={`text-xl cursor-pointer ${
                  !searchTerm ? "invisible" : "visible"
                }`}
                onClick={() => dispatch(clearSearchTerm())}
              />
            </div>
            <button className="h-10 w-10 sm:w-16 flex items-center justify-center bg-zinc-800" >
              <AiOutlineSearch className="text-xl" onClick={() => setsearch(true)} />
            </button>
          </div>
        </form>
        
        <div className="text-xl p-3 bg-zinc-900 rounded-full">
          <TiMicrophone className={search ? "hidden" : "visible"}/>
        </div>
      </div>
      <div className={search ? "hidden" : "flex gap-2 items-center text-xl sm:gap-5"}>
        <BsCameraVideo />
        <IoAppsSharp />
        <div className="relative">
          <BsBell />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
            9+
          </span>
        </div>
      </div>
    </div>
  );
}

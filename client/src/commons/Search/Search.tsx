import { useState } from "react";

function Search() {
    const [openSearch, setOpenSearch] = useState<boolean>(false);

    return (
        <div>
            { 
                !openSearch ? <div onClick={() => setOpenSearch(true)} className="w-56">Поиск интересующей игры</div>
                : 
                <div className="w-56">
                    <input type="text" className="text-black rounded-lg w-48" />
                    <span className="text-sky bg-gray-900 rounded-full p-2 cursor-pointer" onClick={() => setOpenSearch(false)}>x</span>
                </div>
            }
            
        </div>
    );
}

export default Search;
import { useState } from "react";

function Search() {
    const [openSearch, setOpenSearch] = useState<boolean>(false);

    return (
        <div>
            { 
                !openSearch ? <div onClick={() => setOpenSearch(true)}>Поиск игры</div>
                : 
                <>
                    <input type="text" className="text-black rounded-lg" />
                    <span className="text-sky bg-gray-900 rounded-full p-2 cursor-pointer" onClick={() => setOpenSearch(false)}>x</span>
                </>
            }
            
        </div>
    );
}

export default Search;
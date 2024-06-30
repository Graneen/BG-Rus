import { useState } from "react";
import { BoardGameData } from "../../pages/topList/TopList";

function SearchTopList({boardGameData, setSortGames}: {boardGameData: BoardGameData[] | null, setSortGames: React.Dispatch<React.SetStateAction<BoardGameData[] | null>>}) {
    const [startSort, setStartSort] = useState<boolean>(false);
    // const titleGenre: string[] = ["Карточные", "Патигеймы", "Филеры", "Евроигры", "Социальные", "Кооперативные", "Полукооперативные", "Абстрактные", "Варгеймы", "Америтреши", "Контроли территорий", "Легаси", "Roll-and-write", "Dungeon Crawler"];
    // const titleTheme: string[] = ["Исторические", "Экономические", "Фэнтэзи", "Приключения", "Научные", "Реализмы", "Семейные", "Вестерны", "Казуальные"];
        
    function changeHandler(textSearch: string): void {
        if (boardGameData) {
            const filteredArray = boardGameData.filter((element: BoardGameData) => element.title.toLowerCase().includes(textSearch.toLowerCase()));
            // console.log({filteredArray});
            setSortGames(filteredArray);
        } else {
            alert("Список игр пуст!");
        }
    }

    // const map: string[] = ["Андрей", "Влад", "Иван", "Олег", "Слава", "Сергей", "Гриша", "Ира"];
    // const [mao, setMao] = useState(map);
    // function litHandler() {
    //     const number = Math.floor(Math.random() * 8)
    //     const resolt = map[number]
    //     console.log({number});

    //     setMao(resolt)
    // }

    function handlerOpenSearch() {
        startSort ? setStartSort(false) : setStartSort(true);
    }


    return (
        <div>
            <div onClick={handlerOpenSearch} className="cursor-pointer w-32">Сортировка игр</div>
            {
                startSort && 
                <>
                    <input
                        type="text"
                        className="text-black rounded-lg w-80"
                        placeholder="Введите название игры"
                        onChange={(event: React.ChangeEvent<HTMLInputElement> ) => changeHandler(event.target.value)}
                    />
                    <div className="ml-20">
                       
                    </div>
                    
                </>
            }
            
            {/* <div className="bg-red-700 p-5">
                <div>{"место встречи :)"}</div>
                <button onClick={litHandler}>выбрать место</button>
                <div>{mao}</div>
            </div> */}
        </div>
    );
}

export default SearchTopList;
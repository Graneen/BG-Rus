import { useEffect, useState } from "react";
import { BoardGameData } from "../../pages/topList/TopList";
import "./SearchTopList.css"

type typesSearchFields = {
    id: number,
    titleForm: string,
    titleKey: string,
    titleArray: string[]
}

type typeDataSort = {
    genre: string,
    theme: string,
    difficulty: string,
    minPlayers: string,
    maxPlayers: string,
    year: string
}

const initDataSort = {
    genre: "Не выбрано",
    theme: "Не выбрано",
    difficulty: "Не выбрано",
    minPlayers: "Не выбрано",
    maxPlayers: "Не выбрано",
    year: "Не выбрано"
}

function SearchTopList({boardGameData, setSortGames}: {boardGameData: BoardGameData[] | null, setSortGames: React.Dispatch<React.SetStateAction<BoardGameData[] | null>>}) {
    const [startSort, setStartSort] = useState<boolean>(false);
    const [dataSort, setDataSort] = useState<typeDataSort>(initDataSort);
    const [inputData, setInputData] = useState<string>('');

    
    const allGenres: string[] = ["Не выбрано", "Карточные", "Патигеймы", "Филеры", "Евроигры", "Социальные", "Кооперативные", "Полукооперативные", "Абстрактные", "Варгеймы", "Америтреши", "Контроли территорий", "Легаси", "Roll-and-write", "Dungeon Crawler"];
    const allThemes: string[] = ["Не выбрано", "Исторические", "Экономические", "Фэнтэзи", "Приключения", "Научные", "Реализмы", "Семейные", "Вестерны", "Казуальные"];
    const allMinPlayers: string[] = ["Не выбрано", "1", "2", "3", "4", "5", "6"]; //! number
    const allMaxPlayers: string[] = ["Не выбрано", "2", "4", "5", "6", "7", "8", "10", "11", "12", "40", "50", "100"]; //! number
    const allDifficulties: string[] = ["Не выбрано", "1", "2", "3", "4", "5"];
    const allYears: string[] = ["Не выбрано", "1935", "1970", "1971", "1974", "1982", "1986", "1987", "1994", "1995", "1997", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];

    const titlesKey: string[] = ["genre", "theme", "minPlayers", "maxPlayers", "difficulty", "year"];
    const titlesForm: string[] = ["Жанр", "Тематика", "Min игроков", "Max игроков", "Сложность", "Год создания"];
    const titlesArray: string[][] = [allGenres, allThemes, allMinPlayers, allMaxPlayers, allDifficulties, allYears];

    const dataForSearchForms: typesSearchFields[] = titlesForm.map((titleForm: string, index: number) => ({
        id: index + 1,
        titleForm,
        titleKey: titlesKey[index],
        titleArray: titlesArray[index]
    }));

    function handlerOpenSearch(): void {
        if (startSort) {
            setStartSort(false);
            setDataSort(initDataSort);
        } else {
            setStartSort(true);
        }
    }

    function getValue({titleKey, titleValue}: {titleKey: string, titleValue: string}): void {
        const newdataSort = structuredClone(dataSort);

        titleKey === "genre" ? newdataSort.genre = titleValue : newdataSort;
        titleKey === "theme" ? newdataSort.theme = titleValue : newdataSort;
        titleKey === "difficulty" ? newdataSort.difficulty = titleValue : newdataSort;
        titleKey === "minPlayers" ? newdataSort.minPlayers = titleValue : newdataSort;
        titleKey === "maxPlayers" ? newdataSort.maxPlayers = titleValue : newdataSort;
        titleKey === "year" ? newdataSort.year = titleValue : newdataSort;

        setDataSort(newdataSort);
    }

    function sortHandle(textSearch: string): void {
        if (boardGameData) {
            let textSort = boardGameData;
            if (textSearch) {
                textSort = boardGameData.filter((element: BoardGameData) => element.title.toLowerCase().includes(textSearch.toLowerCase()));
            }

            let genreSort = textSort;
            if (dataSort.genre !== "Не выбрано") {
                genreSort = textSort.filter((element: BoardGameData) => element.genre.includes(dataSort.genre));
            }

            let themeSort = genreSort;
            if (dataSort.theme !== "Не выбрано") {
                themeSort = genreSort.filter((element: BoardGameData) => element.theme.includes(dataSort.theme));
            }

            let difficultySort = themeSort;
            if (dataSort.difficulty !== "Не выбрано") {
                difficultySort = themeSort.filter((element: BoardGameData) => element.difficulty.includes(dataSort.difficulty));
            }

            let minPlayersSort = difficultySort;
            if (dataSort.minPlayers !== "Не выбрано") {
                minPlayersSort = difficultySort.filter((element: BoardGameData) => element.minPlayers === Number(dataSort.minPlayers));
            }

            let maxPlayersSort = minPlayersSort;
            if (dataSort.maxPlayers !== "Не выбрано") {
                maxPlayersSort = minPlayersSort.filter((element: BoardGameData) => element.maxPlayers === Number(dataSort.maxPlayers));
            }

            let yearSort = maxPlayersSort;
            if (dataSort.year !== "Не выбрано") {
                yearSort = maxPlayersSort.filter((element: BoardGameData) => element.year.includes(dataSort.year));
            }

            setSortGames(yearSort);
        }
    }

    useEffect(() => {
        sortHandle(inputData);
    }, [dataSort, inputData])

    return (
        <div className="text-center">
            <div
                onClick={handlerOpenSearch}
                className={`cursor-pointer w-36 mb-2 ml-5 p-2 rounded-full border-2 border-double ${startSort ? "text-amber-500 border-yellow-500" : "border-yellow-800"}`}
            >Сортировка игр</div>
            {startSort && 
            <div className="border-sky-600 rounded-t-lg border-4 border-double">
                <input
                    type="text"
                    className="text-black rounded-lg w-80 mt-2 ml-5 border-yellow-500 border-2"
                    placeholder="Введите название игры"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputData(event.target.value)}
                />
                <div className="m-2 flex md:flex-row flex-col justify-between flexboxStyle">
                    {dataForSearchForms.map((dataForm) => {
                        return (
                            <form key={dataForm.id} className="m-1">
                                <label htmlFor={`${dataForm.titleKey}-select`} className="m-1">{dataForm.titleForm}</label>
                                <select
                                    onChange={(e) => getValue({titleKey: dataForm.titleKey, titleValue: e.target.value})}
                                    name={`${dataForm.titleKey}`}
                                    id={`${dataForm.titleKey}-select`}
                                    className="text-black rounded-lg ml-2 border-yellow-500 border-2">
                                    {dataForm.titleArray.map((genre, idx) => {
                                        return <option key={idx} value={genre} className="text-black">{genre}</option>
                                    })}
                                </select>
                            </form>
                        )
                    })}
                </div>
            </div>}
        </div>
    );
}

export default SearchTopList;
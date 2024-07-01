import { useEffect, useState } from "react";
import { BoardGameData } from "../../pages/topList/TopList";

export type BoardGameDataType = {
    Users: Array<{toggler: boolean, name: string}> | [],
    id: number,
    title: string,
    genre: string,
    theme: string,
    difficulty: string,
    poster: string,
    image1: string,
    image2: string,
    author: string,
    minPlayers: number,
    maxPlayers: number,
    players: string,
    time: string,
    video: string,
    year: string,
    description: string,
    createdAt: string,
    updatedAt: string
}

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
    // video: boolean,
    year: string
}

const initDataSort = {
    genre: "Не выбрано",
    theme: "Не выбрано",
    difficulty: "Не выбрано",
    minPlayers: "Не выбрано",
    maxPlayers: "Не выбрано",
    // video: false,
    year: "Не выбрано"
}

function SearchTopList({boardGameData, sortGames, setSortGames}: {boardGameData: BoardGameData[] | null, sortGames: BoardGameData[] | null, setSortGames: React.Dispatch<React.SetStateAction<BoardGameData[] | null>>}) {
    const [startSort, setStartSort] = useState<boolean>(false);
    const [dataSort, setDataSort] = useState<typeDataSort>(initDataSort);

    
    const allGenres: string[] = ["Не выбрано", "Карточные", "Патигеймы", "Филеры", "Евроигры", "Социальные", "Кооперативные", "Полукооперативные", "Абстрактные", "Варгеймы", "Америтреши", "Контроли территорий", "Легаси", "Roll-and-write", "Dungeon Crawler"];
    const allThemes: string[] = ["Не выбрано", "Исторические", "Экономические", "Фэнтэзи", "Приключения", "Научные", "Реализмы", "Семейные", "Вестерны", "Казуальные"];
    const allMinPlayers: string[] = ["Не выбрано", "1", "2", "3", "4", "5", "6"]; //! number
    const allMaxPlayers: string[] = ["Не выбрано", "2", "4", "5", "6", "7", "8", "10", "11", "12", "40", "50", "100"]; //! number
    const allDifficulties: string[] = ["Не выбрано", "1", "2", "3", "4", "5"];
    const allYears: string[] = ["Не выбрано", "1935", "1970", "1971", "1974", "1982", "1986", "1987", "1994", "1995", "1997", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];
    // с видео или без

    const titlesKey: string[] = ["genre", "theme", "minPlayers", "maxPlayers", "difficulty", "year"];
    const titlesForm: string[] = ["Жанр", "Тематика", "Минимальное количество игроков", "Максимальное количество игроков", "Сложность", "Год создания игры"];
    const titlesArray: string[][] = [allGenres, allThemes, allMinPlayers, allMaxPlayers, allDifficulties, allYears];

    const dataForSearchForms: typesSearchFields[] = titlesForm.map((titleForm: string, index: number) => ({
        id: index + 1,
        titleForm,
        titleKey: titlesKey[index],
        titleArray: titlesArray[index]
    }));


    function changeHandler(textSearch: string): void {
        if (boardGameData) {
            const filteredArray = boardGameData.filter((element: BoardGameData) => element.title.toLowerCase().includes(textSearch.toLowerCase()));
            setSortGames(filteredArray);
        }
    }


    //* Выбор места встречи
    // const map: string[] = ["Андрей", "Влад", "Иван", "Олег", "Слава", "Сергей", "Гриша", "Ира"];
    // const [mao, setMao] = useState(map);
    // function litHandler() {
    //     const number = Math.floor(Math.random() * 8)
    //     const resolt = map[number]
    //     console.log({number});

    //     setMao(resolt)
    // }

    //* Функция для получения всех несовподающих значений в каком-то конкретном ключе
    // function getAllKeyValues() {
    //     const arrValue: string[] = [];
    //     boardGameData?.forEach((elm: BoardGameDataType) => {
    //         const keyUsed = elm.description;
    //         if(!arrValue.length) arrValue.push(keyUsed);
    //         let check: number = 0;
    //         arrValue.forEach((inter_elm) => {
    //             if (inter_elm === keyUsed) check = check + 1;
    //         });
    //         check ? arrValue : arrValue.push(keyUsed);
    //     });
    //     console.log({arrValue: arrValue.sort()});
    // }

    function handlerOpenSearch(): void {
        startSort ? setStartSort(false) : setStartSort(true);
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

//! импут подлинее, крестик чуть дальше от границы, жёлтый фон для крестика, квиз 0 участников! переход со страницы квиза на страницу профиля, бордер радиус на выбранный жанр в квизе
//! 

    useEffect(() => {
        if (boardGameData) {
            if (dataSort.genre !== "Не выбрано") {
                const filteredArray = boardGameData.filter((element: BoardGameData) => element.genre.includes(dataSort.genre));
                setSortGames(filteredArray);
            } else if (dataSort.theme !== "Не выбрано") {
                const filteredArray = boardGameData.filter((element: BoardGameData) => element.theme.includes(dataSort.theme));
                setSortGames(filteredArray);
            } else if (dataSort.difficulty !== "Не выбрано") {
                const filteredArray = boardGameData.filter((element: BoardGameData) => element.difficulty.includes(dataSort.difficulty));
                setSortGames(filteredArray);
            } else if (dataSort.minPlayers !== "Не выбрано") {
                const filteredArray = boardGameData.filter((element: BoardGameData) => element.minPlayers === Number(dataSort.minPlayers));
                setSortGames(filteredArray);
            } else if (dataSort.maxPlayers !== "Не выбрано") {
                const filteredArray = boardGameData.filter((element: BoardGameData) => element.maxPlayers === Number(dataSort.maxPlayers));
                setSortGames(filteredArray);
            } else if (dataSort.year !== "Не выбрано") {
                const filteredArray = boardGameData.filter((element: BoardGameData) => element.year.includes(dataSort.year));
                setSortGames(filteredArray);
            } else {
                setSortGames(boardGameData);
            }

            // if (dataSort.genre !== "Не выбрано") {
            //     //! sortGames
            //     const filteredArray = boardGameData.filter((element: BoardGameData) => element.genre.includes(dataSort.genre));
            //     setSortGames(filteredArray);
            // } else {
            //     setSortGames(boardGameData);
            // }

            // if (dataSort.theme !== "Не выбрано") {
            //     const filteredArray = boardGameData.filter((element: BoardGameData) => element.theme.includes(dataSort.theme));
            //     setSortGames(filteredArray);
            // } else {
            //     setSortGames(boardGameData);
            // }

            // if (dataSort.difficulty !== "Не выбрано") {
            //     const filteredArray = boardGameData.filter((element: BoardGameData) => element.difficulty.includes(dataSort.difficulty));
            //     setSortGames(filteredArray);
            // } else {
            //     setSortGames(boardGameData);
            // }

            // if (dataSort.minPlayers !== "Не выбрано") {
            //     const filteredArray = boardGameData.filter((element: BoardGameData) => element.minPlayers === Number(dataSort.minPlayers));
            //     setSortGames(filteredArray);
            // } else {
            //     setSortGames(boardGameData);
            // }

            // if (dataSort.maxPlayers !== "Не выбрано") {
            //     const filteredArray = boardGameData.filter((element: BoardGameData) => element.maxPlayers === Number(dataSort.maxPlayers));
            //     setSortGames(filteredArray);
            // } else {
            //     setSortGames(boardGameData);
            // }

            // if (dataSort.year !== "Не выбрано") {
            //     const filteredArray = boardGameData.filter((element: BoardGameData) => element.year.includes(dataSort.year));
            //     setSortGames(filteredArray);
            // } else {
            //     setSortGames(boardGameData);
            // }
        }
    }, [dataSort])

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
                        {dataForSearchForms.map((dataForm) => {
                            return (
                                <form key={dataForm.id}>
                                    <label htmlFor={`${dataForm.titleKey}-select`}>{dataForm.titleForm}</label>
                                    <select onChange={(e) => getValue({titleKey: dataForm.titleKey, titleValue: e.target.value})} name={`${dataForm.titleKey}`} id={`${dataForm.titleKey}-select`} className="text-black rounded-lg ml-2">
                                        {dataForm.titleArray.map((genre, idx) => {
                                            return <option key={idx} value={genre} className="text-black">{genre}</option>
                                        })}
                                    </select>
                                </form>
                            )
                        })}
                    </div>
                </>
            }
            
            {/* //* Выбор места встречи */}
            {/* <div className="bg-red-700 p-5">
                <div>{"место встречи :)"}</div>
                <button onClick={litHandler}>выбрать место</button>
                <div>{mao}</div>
            </div> */}
        </div>
    );
}

export default SearchTopList;
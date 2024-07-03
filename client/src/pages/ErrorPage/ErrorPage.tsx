import "../QuizPage/QuizPage.css"

function ErrorPage() {
    return (
        <div className="mt-24 mb-10 flex flex-row justify-center">
            <div className="flex flex-col items-center w-1/4">
                <div className="my-2">
                    <div className="bbb text-4xl">{"СТРАНИЦА НЕ НАЙДЕНА"}</div>
                    <div className="bbb text-[12rem] -m-12 text-center">{"404"}</div>
                    <div className="bbb text-xl">{"НЕТУ ТАКОЙ... ЧЕСТНО... Я ВЕЗДЕ ПОИСКАЛА"}</div>
                </div>
                
                <div className="text-sm my-4">
                    <p>{"Простите меня... то, что Вы просили - я не могу найти."}</p>
                    <p>{"Правда-правда. Не потому, что не искала, а потому, что не нашла. Может быть то, что Вы попросили найти - вообще не существует... Наверное..."}</p>
                </div>
                <div className="bbb text-xl my-4">{"Возможно, это случилось по одной из этих причин:"}</div>
                <div>
                    <ul className="text-sm my-2">
                        <li>{"* Вы злой человек и заставили меня искать то, чего нет... (непрапильно набрали url)"}</li>
                        <li>{"* Ищете то, что было ещё до меня, революции и динозавров..."}</li>
                        <li>{"* Вас обманули злые люди и дали неработающую ссылку..."}</li>
                    </ul>
                </div>
                <div className="bbb text-xl my-4">{"Я действительно хочу Вам помочь... Попробуйте:"}</div>
                <div>
                    <ul className="text-sm my-2">
                        <li>{"* вернуться назад при помощи кнопки браузера back (это такая стрелка загнутая влево на самом верху)"}</li>
                        <li>{"* ещё раз написать адрес страницы, может ошиблись..."}</li>
                        <li>{"* перейти на главную страницу сайта. Там очень хорошо и можно найти нужную страницу (используйте поиск на сайте.)"}</li>
                    </ul>
                </div>
            </div>
            <div className="my-10 ml-5">
                <img
                    // src={"https://4.downloader.disk.yandex.ru/preview/6d7350fefc03e38ba470d375c6ed82f917841258759645714af27d59bb110c43/inf/iJt8tQy9RpbFo2cnjs1Cg2Kf6tEK5FW489X6nLwMkyJPzs1n5CtSglVzvEgUK638m5iVl7ckgBuhsl6Mahgfiw%3D%3D?uid=293925238&filename=Untitled-hgKm9oAd9-transformed.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=293925238&tknv=v2&size=1879x949"}
                    alt="image"
                />
            </div>
        </div>
    );
}

export default ErrorPage;
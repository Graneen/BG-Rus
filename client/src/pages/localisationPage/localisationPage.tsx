import React, { useState } from 'react';

function LocalisationPage() {
    const [gameTitle, setGameTitle] = useState('');
    const [translationNeed, setTranslationNeed] = useState('');

    const handleAddAd = (event) => {
        event.preventDefault();
        
        console.log('Название игры:', gameTitle);
        console.log('Описание что нужно перевести у игры:', translationNeed);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
                <h1>Локализация</h1>

                <form onSubmit={handleAddAd} style={{ textAlign: 'center', marginTop: '20px' }}>
                    <label>
                        Название игры:
                        <input type="text" value={gameTitle} onChange={(e) => setGameTitle(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Что перевести:
                        <textarea value={translationNeed} onChange={(e) => setTranslationNeed(e.target.value)} />
                    </label>
                    <br />
                    <button type="submit">Добавить объявление</button>
                </form>
            </div>
        </>
    );
}

export default LocalisationPage;
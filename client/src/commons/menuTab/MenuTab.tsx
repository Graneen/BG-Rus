import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { boardGameState, feedBack } from '../../features/gameCardSlice';
import QAComponent from './QA/QAComponent';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MenuTab({ card }: { card: boardGameState }) {
    const [value, setValue] = React.useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabStyler = {
        color: 'var(--goldenbeer)',
        fontFamily: 'ROSTOV',
        fontSize: '2.2em',
        textTransform: 'capitalize'
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                    <Tab sx={tabStyler} label="Видеообзор" {...a11yProps(0)} />
                    <Tab sx={tabStyler} {...a11yProps(0)} label="Отзывы" {...a11yProps(1)} />
                    <Tab sx={tabStyler} label="Вопрос-ответ" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <iframe className="w-full h-[70vh]" src={`https://www.youtube.com/embed/${card.list.boardGame.video.slice(17)}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                </iframe>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            {card.list.feedBackGame && card.list.feedBackGame.length > 0 ? card.list.feedBackGame.map((el: feedBack, i) => (
            <div key={i}>
            <h2>
                Отзыв №{i + 1} пользователя user-{el.user_id} от {el.createdAt.slice(0, 10)}
            </h2>
            <div className="my-[5vh] bg-sky-500/50 p-5 rounded-lg">
                {el.description}
            </div>
            </div>
            )) 
            : <div> Никто пока не писал отзывов на эту игру, будьте первым!</div>}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            <QAComponent gameId={card.list.boardGame.id} />
            </CustomTabPanel>
        </Box>
    );
}
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


const tabStyler = {
    color: 'var(--main-color-bb)',
    fontFamily: 'ROSTOV',
    fontSize: '2.2em',
    textTransform: 'capitalize'
}


export default function MediaCard({ game }) {
    const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: 'var(--main-color-bb)' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={game.img}
        title={`Игротека по "${game.gameName}", организатор: ${game.name}`}
      />
      <CardContent >
        <Typography gutterBottom variant="h5" 
                                 component="div"
                                 sx={{     fontFamily: 'ROSTOV', color: 'var(--goldenbeer)',}}>
        {game.gameName}
        </Typography>
        <Typography variant="body2" sx={{     fontFamily: 'Exo-2-Medium', color: 'var(--main-color-00)',}}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/game/${game.game_id}`)} sx={{     fontFamily: 'Exo-2-Medium', color: 'var(--main-color-00)',}}>Об игре</Button>
        <Button size="small">Связаться с организаторами</Button>
      </CardActions>
    </Card>
  );
}
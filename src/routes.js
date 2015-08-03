import pokemon from './routes/pokemon';
import pokedex from './routes/pokedex';

export default (app) => {
    pokemon(app);
    pokedex(app);
};

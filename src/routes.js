import pokemon from './routes/pokemon';
import pokedex from './routes/pokedex';
import language from './routes/language';

export default (app) => {
    pokemon(app);
    pokedex(app);
    language(app);
};

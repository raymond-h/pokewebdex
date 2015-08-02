import feign from 'feignjs';
import FeignNode from 'feignjs-node';

const apiDesc = {
    getAllPokemon: 'GET /api/pokemon',
    getPokemon: 'GET /api/pokemon/{id}'
};

export default feign.builder()
    .client(new FeignNode())
    .decoder(new feign.JsonDecoder())
    .encoder(new feign.JsonEncoder())
    .target(apiDesc, '');

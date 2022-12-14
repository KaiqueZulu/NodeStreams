import http from 'http';
import { Readable } from 'stream';
import { randomUUID } from 'crypto'

//função generator
function* run() {
    for (let index = 0; index <= 99; index++) {
        const data = {
            id: randomUUID(),
            name: `Kaique-${index}`
        };
        //manda todo dado pronto para frente, não esperando o termino do laço
        yield data;
    };

};

function heandler(request, response) {
    const readable = new Readable({
        read() {
            //para informar que os dados acabaram
            //this.push(null);

            for (const data of run()) {
                console.log(`Seding`, data);
                //encaminha os dados para o pipe, e do pipe para o cliente final
                this.push(JSON.stringify(data) + '\n');
            };
            this.push(null);
        }
    });
    readable
        .pipe(response);

};

http.createServer(heandler)
    .listen(3000)
    .on('listening', () => console.log('server running at 3000'));
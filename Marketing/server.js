import http from 'http'; 
import fs from 'fs';
import {URL} from 'url';

const server = http.createServer((req, res)=> {
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const name = myUrl.searchParams.get('name');
    const email = myUrl.searchParams.get('email');
    const idade = myUrl.searchParams.get('idade');

    if(!name && !email && !idade) {
        fs.readFile('index.html', function(err, data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(data);
            return res.end()
        });
    }else {
        const user = {
            name: name,
            email: email,
            idada: idade
        };
    
        const arquivoJson = JSON.stringify(user, null, 3);
    
        fs.appendFile('user.json', arquivoJson, (err)=> {
            if(err) {
                res.writeHead(500, {'Content-Type':'text/plain'});
                res.end('Erro No Servidor');
            };
            res.writeHead(302, {location:'/'});
            return res.end();
        });
    };
});



server.listen(3000, ()=> {
    console.log('Servidor rodando da Pt 30000 ...!')
})

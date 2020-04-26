'use strict'

const hapi = require('@hapi/hapi')
const Hoek = require('@hapi/hoek')


// Tell our app to listen on port 3000
const server = new hapi.Server({  
    host: 'localhost',
    port: 3000
  })

//Constantes de geração
const nameseparator = '.' //Separador de nomes. Pode ficar em branco.
const maildomain = '@unifacef.edu.br'//Dominio do email gerado.
const mailseparator = ','//Separador de emails. Não pode ficar em branco.

// Create the POST route to /sms
server.route({
    method: 'GET',
    path: '/mail/{user}',
    handler: function (request, h) {
            let name = request.params.user
            let generated = ''
            let names = name.split(' ');
            for (let index = 0; index < names.length -1; index++) {
                generated += `${names[0]}${nameseparator}${names[index + 1]}${maildomain}`
                generated += mailseparator
            }
            generated += `${names[0]}${nameseparator}`
            for (let index = 1; index < names.length -1; index++) {generated += names[index].split('')[0]}
            generated += `${names[names.length - 1]}`
            generated += `${maildomain}`
            generated += mailseparator
            generated += `${names[0]}${nameseparator}`
            for (let index = 1; index < names.length; index++) {generated += names[index].split('')[0]}
            generated += `${maildomain}`
            generated += mailseparator
            for (let index = 0; index < names.length - 1; index++) {generated += names[index].split('')[0]}
            generated += `${nameseparator}${names[names.length - 1]}`
            generated += `${maildomain}`
            generated += mailseparator
        return generated
        
    }
});

server.start(function (err) {
  if (err) {
    throw err
  }

  console.log('Server started on port 3000')
})
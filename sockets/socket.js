const {io} = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');
const bands = new Bands();

bands.addBand(new Band('Nigga'));
bands.addBand(new Band('Bon jovi'));
bands.addBand(new Band('Herues del silencio'));
bands.addBand(new Band('Katy Perry'));
console.log(bands);
//Mensajes de soket
io.on('connection', client => {
    console.log('Cliente Conectado');
    client.emit('active-bands',bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente Desconectado');
     });


     client.on('mensaje',( payload) => {

        console.log('Mensaje!!!', payload);

        io.emit('mensaje',{admin:'Nuevo Mensaje'});
     });


     client.on('emitir-mensaje',( payload) => {
      client.broadcast.emit('nuevo-mensaje',payload);
      //console.log('emitir-mensaje!!!', payload);

      //io.emit('nuevo-mensaje',payload);
   });
   client.on('vote-band',(payload)=>{
      bands.voteBand(payload.id);
      io.emit('active-bands',bands.getBands()); // todos los clientes conectados
  });

  client.on('add-band',(payload)=>{
   bands.addBand(new Band(payload.name));
   io.emit('active-bands',bands.getBands());
  });

  client.on('delete-band',(payload)=>{
   bands.deleteBand(payload.id);
   io.emit('active-bands',bands.getBands());
  });
  });
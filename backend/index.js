import express  from 'express' 
import  body_parser from 'body-parser'
import rutaValidacion from './src/routes/autotenticaion.route.js';
import rutaUsuario from './src/routes/routes.usuarios.js';
import rutaCostos from './src/routes/CostosRoutesdevSdva.js';
import rutaCultivo from './src/routes/CultivosRoutesdevSdva.js';
import router from './src/routes/Finca.routes.js';
import inversiones from './src/routes/InversionesroutesdevJrl.js';
import rutalote from './src/routes/lotes.routes.js';
import rutaProduccion from './src/routes/ProduccionRoutesDevpap.js';
import rutaProgramacion from './src/routes/programacionRoutesDevdjz.js';
import rutaDeTipoRecurso from './src/routes/TipoRecurso.route.js';
import  {rutaDeActividad}  from './src/routes/Actividad.route.js';
import rutaDeVariedad from './src/routes/variedad.routes.js';
import cors from 'cors';


const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extended: false}))
servidor.use(cors());



servidor.set('view engine', 'ejs');
servidor.set('views','./views');

servidor.get('/documents',(req,res)=>{
    res.render('document.ejs');
})

servidor.use(express.static('./public'));

servidor.use(rutaValidacion)
servidor.use(rutaUsuario)
servidor.use(rutaCostos)
servidor.use('/cultivo',rutaCultivo)
servidor.use(rutaDeActividad)
servidor.use(router)
servidor.use(inversiones)
servidor.use(rutalote)
servidor.use(rutaProduccion)
servidor.use(rutaProgramacion)
servidor.use(rutaDeTipoRecurso)
servidor.use(rutaDeVariedad)




servidor.listen(3000, () =>{
    console.log("esta funcionando")
})
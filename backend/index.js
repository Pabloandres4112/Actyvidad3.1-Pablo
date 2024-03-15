import express  from 'express' 
import  body_parser from 'body-parser'
import rutaValidacion from './src/routes/autotenticaion.route.js'
import rutaUsuario from './src/routes/UsuariosRoutesdevkvd.js'
import rutaValidacion from './src/routes/autotenticaion.routedevkvd.js'

const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extended: false}))


servidor.set('view engine', 'ejs');
servidor.set('views','./views');

servidor.use(rutaUsuario)
servidor.get('/document',(req,res)=>{
    res.render('documentdevjrl.ejs');
})

servidor.use(express.static('./public'));

servidor.use(rutaValidacion)


servidor.listen(3000, () =>{
    console.log("esta funcionando")
})
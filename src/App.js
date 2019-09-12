import React, { useState, useEffect, Fragment } from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Informacion from './components/Informacion';
import axios from 'axios';

function App(){
    //Utilizar useState con 3 sstates distintos
    const [ artista, agregarArtista ] = useState('');
    const [ letra, agregarLetra ] = useState([]);
    const [ info, agregarInfo ] = useState({});

    //Metodo para consultar la API de Letras de canciones
    const consultarApiLetra = async(busqueda) => {
        //console.log(busqueda)
        const { artista, cancion } = busqueda;
        const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

        //Consultar Api
        const resultado = await axios(url);
       // console.log(resultado.data.lyrics);
        //Almacenar el artista que se busco
        agregarArtista(artista);
        //almacenar la eltra en el state
        agregarLetra(resultado.data.lyrics);

    }

    //Metodo para consultar la API de informacion
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const consultarAPIInfo = async () =>{
        if(artista){
            const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
            const resultado = await axios(url);
            console.log(resultado)
            agregarInfo(resultado.data.artists[0]);
            console.log(info)
        }
    }

    // componentDidMount & componentDidUpdate el equivalente es el useEffect
    useEffect(
        () => {
            consultarAPIInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[artista]
    )

    return (
			<Fragment>
				<Formulario consultarApiLetra={consultarApiLetra} />
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6">
                           <Informacion
                               info={info}
                           />
                        </div>
                        <div className="col-md-6">
                        <Cancion
                            letra={letra}
                        />
                        </div>
                    </div>
                </div>
			</Fragment>
		);
}

export default App;
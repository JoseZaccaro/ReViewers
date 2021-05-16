import {connect} from 'react-redux'
import React , {useEffect , useState, useMatch} from 'react'
import publicacionesActions from '../redux/actions/publicacionesActions'
import PublicacionIndividual from '../components/utilidades/PublicacionIndividual'
import Loader from 'react-loader-spinner'
import { useParams } from 'react-router-dom';

const Publicaciones = (props)=>{
   console.log(props.match.params.categoria)
    const [publicaciones, setPublicaciones] = useState()
    const {categoria} = useParams()
    const [portada, setPortada] = useState(`url('/assets/caratulas/${categoria}.jpg')`)
    const categoriaCapitalized = categoria === "all" ? "Todas las publicaciones" : categoria.charAt(0).toUpperCase() + categoria.slice(1)
    

    useEffect(()=>{
        const fetchear = async()=>{
            const todasLasPublicaciones = await props.todasPublicaciones()
            categoria === "all" ? setPublicaciones(todasLasPublicaciones) : setPublicaciones(todasLasPublicaciones.filter(publicacion => publicacion.categoria === categoria))
        }
        fetchear();
    },[])
    
    if(!publicaciones || !publicaciones[1]){
        return(
            <div className="contenedorLoader">
                <Loader
                    type="Puff"
                    color="#161c26"
                    secondaryColor="#161c26"
                    height={450}
                    width={450}
                    timeout={3000} //3 secs
                />
            </div>  
        )
    }


    return(
        <>
        <div className="contenedor-tituloDeResenia">
            <div className="imagen-de-categoria" style={{backgroundImage: portada}}></div>
            <h1 className="titulo-de-resenia titulosAlt" style={{top:'0px'}}>{categoriaCapitalized}</h1>
        </div>
        <div className="contenedorPublic">
            {publicaciones.map((publicacion , index)=>{
                return(
                    <PublicacionIndividual key={index} publicacion={publicacion}/>
                )
            })}
        </div>

        </>
    )
}

const mapStateToProps = state => {
    return {
        publicaciones: state.publicacionReducer.todasLasPublicaciones
    }
}
const mapDispatchToProps = {
    todasPublicaciones: publicacionesActions.obtenerTodasPublicaciones
}

export default connect(mapStateToProps , mapDispatchToProps)(Publicaciones)
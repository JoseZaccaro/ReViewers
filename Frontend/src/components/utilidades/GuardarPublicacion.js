import { useEffect, useState } from "react"
import {connect} from "react-redux"
import Rating from '@material-ui/lab/Rating';
import { Icon, InlineIcon } from '@iconify/react';
import bookmarkStar from '@iconify-icons/bi/bookmark-star';
// import { InlineIcon } from '@iconify/react';
import bookmarkStarFill from '@iconify-icons/bi/bookmark-star-fill';
import trashIcon from '@iconify-icons/bi/trash';
import noteEditLine from '@iconify-icons/clarity/note-edit-line';
import {FiSend} from 'react-icons/fi'
import publicacionesActions from '../../redux/actions/publicacionesActions'

const GuardarPublicacion = (props)=>{
    
    const [publicacionFaveada, setPublicacionFaveada] = useState(false)

    useEffect(async()=>{
        if(props.usuarioLogeado) {
            const respuesta = await props.publicacionFueGuardada(props.reseniaSeleccionada._id, props.usuarioLogeado.token)
            setPublicacionFaveada(respuesta.data.usuarioYaGuardoPublicacion)
        }
    },[])

    const funcionGuardarPublicacion = async ()=>{
        if(props.usuarioLogeado) {
            setPublicacionFaveada(!publicacionFaveada)
            props.guardarPublicacion(props.reseniaSeleccionada._id, props.usuarioLogeado.token)
        } else {
            alert('Debes estar logeado para guardar una publicacion')
        }
     }
    
    return( 
        <>
            <Icon icon={bookmarkStar} className={publicacionFaveada ? "displayNone" : "icono-guardar"} 
            onClick={() => funcionGuardarPublicacion()}  />
        
            <Icon icon={bookmarkStarFill} className={publicacionFaveada ? "icono-guardar" : "displayNone"} 
            onClick={() => funcionGuardarPublicacion()} />                
        </>
    )
}

const mapStateToProps = (state)=>{
    return {
        usuarioLogeado: state.authReducer.usuarioLogeado
    }
}
 
 const mapDispatchToProps = {
    guardarPublicacion: publicacionesActions.guardarPublicacion,
    publicacionFueGuardada: publicacionesActions.publicacionFueGuardada,
 }

export default  connect(mapStateToProps, mapDispatchToProps)(GuardarPublicacion)
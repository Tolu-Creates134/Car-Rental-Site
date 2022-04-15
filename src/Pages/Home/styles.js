import { makeStyles } from '@mui/styles'
import Image from './hero-image2.jpg'

export default makeStyles(() => ({
    hero: {
        backgroundImage: `url(${Image})`,
        minHeight: '90vh',
        width: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'none',
        display: 'flex',
        flexDirection: 'column'

    },

    text: {
        minWidth: '100%',
        textAlign: 'center',
        fontSize: '35px',
        textTransform: 'uppercase',
        position: 'relative',
        top: '20px'

    },

    buttons: {
        marginTop: '500px',
        marginLeft: '200px'
    },
    
    btn: {
        height: '100px',
        width: '200px',
        marginLeft: '10px',
        fontSize: '20px',
        backgroundColor: 'transparent',
        border: '1px solid white',
        color: 'white',
        cursor: 'pointer'
    },

    about: {
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white',
        minHeight: '20vh',
        minWidth: '100%'
    }

    



}))
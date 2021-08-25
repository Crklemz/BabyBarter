import { makeStyles, createTheme } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';


const theme = createTheme ({

}) //end createTheme

const useStyles = makeStyles ({

//About Page
AboutBodyLists: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
},

//Header Component
Header: {
    margin: 0,
    padding: '10px',
    display: 'block',
    justifyContent: 'center',
    backgroundColor: 'pink',
},

UpperHeader: {

},

LowerHeader: {

},

NavLink: {
    padding: '10px',
    float: 'right',

},

NavBar: {

},

HeaderSlogan: {
    textAlign: 'center',
}

}) //end use/make styles

export { useStyles, theme };

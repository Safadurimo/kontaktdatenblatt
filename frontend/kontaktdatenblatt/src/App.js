import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import { DataGrid } from '@mui/x-data-grid';

const drawerWidth = 240;

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'richtung',
    headerName: 'Richtung',
    width: 150,
    editable: false,
  },
  {
    field: 'sender',
    headerName: 'Sender',
    width: 150,
    editable: false,
  },
  {
    field: 'nachricht',
    headerName: 'Nachricht',
    type: 'number',
    width: 1000,
    editable: false,
    valueGetter: (params) =>
      `${ JSON.stringify(params.row.message) }`,
  }
];

const rows = [
  { id: 1, richtung: 'in', sender: '2', nachricht: 35 },
  { id: 2, richtung: 'out', sender: '1', nachricht: 42 }
];



class Nachrichten extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      nachrichten: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {

    const USER_SERVICE_URL = 'http://localhost:8000/nachrichten';

    fetch(USER_SERVICE_URL)
      .then(response => response.json())
      .then(result => {
        this.setState({ nachrichten: result, isFetching: false })
      })
      .catch(e => {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      });
  }



  render() {
    return (
      <div id="Nachrichten">
        <h1> Nachrichten </h1>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={this.state.nachrichten}
            columns={columns}
            pageSize={5}
          />
        </div>
      </div>
    );
  }
}


const ManuelleNachricht = () => (
  <div id="manuelleNachricht">
    <h1> Manuelle Nachricht einspielen </h1>
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <textarea id="w3review" name="w3review" rows="20" cols="200">

      </textarea>
    </Box>
    <Button variant="contained">Nachricht Einspielen</Button>
  </div>
)

class Marktpartner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      marktpartner: []
    };
  }


  fetchData() {

    const USER_SERVICE_URL = 'http://localhost:8000/marktpartner';

    fetch(USER_SERVICE_URL)
      .then(response => response.json())
      .then(result => {
        this.setState({ marktpartner: result, isFetching: false })
      })
      .catch(e => {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      });
  }

  render() {
    return (
      <div id="manuelleNachricht">
        <h1> Marktpartner </h1>

        <List>
          {this.state.marktpartner.map((obj, index) => (
            <ListItem button key={obj.id}  >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={obj.name} />
            </ListItem>
          ))}


        </List>
      </div>
    );
  }

  componentDidMount() {
    this.fetchData();
  }

}


const Kontaktdaten = () => (
  <div id="manuelleNachricht">
    <h1> Kontaktdaten </h1>
    <TextField
      required
      id="outlined-required"
      label="Ansprechpartner"
      defaultValue=""
    />
  </div>
)

function App() {

  const list = [
    {
      text: 'Nachrichten',
      id: 'nachricht'
    },
    {
      text: 'Manuelle Nachricht einspielen',
      id: 'manuell'
    },
    {
      text: 'Marktpartner',
      id: 'marktpartner'
    },
    {
      text: 'Eigene Kontaktdaten',
      id: 'kontaktdaten'
    },

  ]

  const [showNachrichten, setShowNachrichten] = React.useState(false);
  const [showManuell, setShowManuell] = React.useState(false);
  const [showMarktpartner, setShowMarktpartner] = React.useState(false);
  const [showKontaktdaten, setShowKontaktdaten] = React.useState(false);

  function activateLasers(id) {
    switch (id) {
      case 'nachricht':
        setShowNachrichten(true);
        setShowManuell(false);
        setShowMarktpartner(false);
        setShowKontaktdaten(false);
        break;
      case 'manuell':
        setShowNachrichten(false);
        setShowManuell(true);
        setShowMarktpartner(false);
        setShowKontaktdaten(false);
        break;
      case 'marktpartner':
        setShowNachrichten(false);
        setShowManuell(false);
        setShowMarktpartner(true);
        setShowKontaktdaten(false);
        break;
      case 'kontaktdaten':
        setShowNachrichten(false);
        setShowManuell(false);
        setShowMarktpartner(false);
        setShowKontaktdaten(true);
        break;
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Kontaktdatenblatt Demo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {list.map((obj, index) => (
              <ListItem button key={obj.id} onClick={(e) => activateLasers(obj.id, e)} >
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={obj.text} />
              </ListItem>
            ))}
          </List>

        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div>

          {showNachrichten ? <Nachrichten /> : null}
          {showManuell ? <ManuelleNachricht /> : null}
          {showMarktpartner ? <Marktpartner /> : null}
          {showKontaktdaten ? <Kontaktdaten /> : null}
        </div>


      </Box>
    </Box>
  );
}

export default App;

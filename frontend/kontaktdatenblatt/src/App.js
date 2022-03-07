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
import { DataGrid } from '@mui/x-data-grid';

const drawerWidth = 240;

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'zeitpunkt',
    headerName: 'Zeitpunkt',
    width: 150,
    valueGetter: (params) =>
      `${new Date(params.row.timestamp).toLocaleString()}`
  },
  {
    field: 'richtung',
    headerName: 'Richtung',
    width: 100,
    editable: false,
  },
  {
    field: 'sender',
    headerName: 'Sender',
    width: 100,
    editable: false,
  },
  {
    field: 'empfaenger',
    headerName: 'Empfänger',
    width: 100,
    editable: false,
  },
  {
    field: 'nachricht',
    headerName: 'Nachricht',
    type: 'number',
    width: 1000,
    editable: false,
    valueGetter: (params) =>
      `${JSON.stringify(params.row.nachricht)}`,
  }
];


class Nachrichten extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      nachrichten: []
    };

    this.refresh = this.refresh.bind(this);
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

  refresh() {
    this.fetchData();
  }



  render() {
    return (
      <div id="Nachrichten">
        <h1> Nachrichten </h1>
        <Button variant="contained" onClick={this.refresh} >Refresh</Button>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={this.state.nachrichten}
            columns={columns}
            pageSize={15}
            sortModel={[{
              field: 'zeitpunkt',
              sort: 'desc',
            }]}
          />
        </div>
      </div>
    );
  }
}


class ManuelleNachricht extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.manuelleNachrichtEinspielen = this.manuelleNachrichtEinspielen.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  manuelleNachrichtEinspielen() {
    fetch('/nachrichten', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JSON.parse(this.state.value))
    })
    this.setState({ value: '' });
  }

  render() {
    return (
      <div id="manuelleNachricht">
        <h1> Manuelle Nachricht einspielen </h1>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <textarea value={this.state.value} id="w3review" name="w3review" rows="20" cols="200" onChange={this.handleChange}>

          </textarea>
        </Box>
        <Button variant="contained" onClick={this.manuelleNachrichtEinspielen} >Nachricht Einspielen</Button>
      </div>
    )
  }
}

class Marktpartner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      marktpartner: []
    };
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    this.fetchData();
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
    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'name',
        headerName: 'name',
        width: 100,
        editable: false,
      },
      {
        field: 'ansprechpartner',
        headerName: 'Ansprechpartner',
        width: 200,
        editable: false,
      }
    ];
    return (
      <div id="marktpartner">
        <h1> Marktpartner </h1>

        <Button variant="contained" onClick={this.refresh} >Refresh</Button>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={this.state.marktpartner}
            columns={columns}
            pageSize={15}
          />
        </div>

      </div>
    );
  }

  componentDidMount() {
    this.fetchData();
  }

}

class Kontaktdaten extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: "view",
      isFetching: false,
      eigeneKontaktdaten: ""
    };
    this.goToEditMode = this.goToEditMode.bind(this);
    this.saveAndGoToViewMode = this.saveAndGoToViewMode.bind(this);
    this.refresh = this.refresh.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.state.mode === "view") {
      return;
    }
    else {
      const x = this.state.eigeneKontaktdaten;
      x.ansprechpartner = event.target.value;
      this.setState({ eigeneKontaktdaten: x });
    }
  }

  refresh() {
    this.fetchData();
    this.setState({ mode: "view" });
  }

  goToEditMode() {
    this.setState({ mode: "edit" });
  }

  saveAndGoToViewMode() {
    this.setState({ mode: "view" });
    fetch('/kontaktdaten', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.eigeneKontaktdaten)
    })
  }

  fetchData() {

    const USER_SERVICE_URL = '/eigeneKontaktdaten';

    fetch(USER_SERVICE_URL)
      .then(response => response.json())
      .then(result => {
        this.setState({ eigeneKontaktdaten: result, isFetching: false })
      })
      .catch(e => {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div id="kontadaten">
        <h1> Kontaktdaten </h1>
        <Button variant="contained" onClick={this.refresh} >Refresh</Button>
        <br></br>
        <Button
          sx={{ m: 2 }}
          disabled={this.state.mode === "edit"}
          variant="contained"
          onClick={this.goToEditMode}
        >
          Editieren
        </Button>
        <Button
          sx={{ m: 2 }}
          variant="contained"
          onClick={this.saveAndGoToViewMode}
          disabled={this.state.mode === "view"}
        >
          Save</Button>
        <br></br>
        <TextField
          required
          value={this.state.eigeneKontaktdaten.ansprechpartner}
          id="outlined-required"
          label="Ansprechpartner"
          defaultValue=""
          onChange={this.handleChange}
        />
      </div>
    )


  }
}
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

  const [showNachrichten, setShowNachrichten] = React.useState(true);
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

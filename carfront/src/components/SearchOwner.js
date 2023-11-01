import React, { useState, useEffect } from 'react';
//import CarList from './Carlist'; // Make sure the path to CarList is correct
import { SERVER_URL } from '../constants'; // Import your server URL from a constants file
import '../App.css';
import Snackbar from "@mui/material/Snackbar";
import { DataGrid } from "@mui/x-data-grid";
//import Button from "@mui/material/Button";
import AddOwner from "./AddOwner.js";
import EditOwner from './EditOwner.js';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
//import { blue, lightBlue } from "@mui/material/colors";
//import logo from '../logo.svg';



function SearchOwner() {
  const [searchTerm, setSearchTerm] = useState('');
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchOwners = () => {
    const token = sessionStorage.getItem('jwt');
    fetch(SERVER_URL + 'api/owners', {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        setOwners(data._embedded.owners);
        setFilteredOwners(data._embedded.owners); // Initialize filteredOwners with all owners
      })
      .catch((err) => console.error(err));
  };

  const addOwner = owner => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/owners", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(owner),
    }).then((response) => {
      if (response.ok) {
        fetchOwners();
      } else {
        alert("Something went wrong !!");
      }
    }).catch(err => console.error(err));
  };

  const updateOwner = (owner, link) => {
    const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token  },
      body: JSON.stringify(owner),
    }).then((response) => {
      if (response.ok) {
        fetchOwners();
      } else {
        alert("Something went wrong !!");
      }
    }).catch(err => console.error(err));
  };

  const onDelClick = url => {
    const token = sessionStorage.getItem("jwt");
    if (window.confirm("Are you sure to delete ?")) {
      fetch(url, { 
        method: "DELETE",
        headers: {Authorization: token}, 
      })
        .then((response) => {
          if (response.ok) {
            fetchOwners();
            setOpen(true);
          } else {
            alert("Some thing is wrong !!!!");
          }
        })
        .catch((Err) => console.error(Err));
    }
  };
  const columns = [
    { field: "firstname", headerName: "Prenom", width: 200 },
    { field: "lastname", headerName: "Nom", width: 200 },
    {
      field: "_links.owner.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: row => <EditOwner data={row} updateOwner={updateOwner}/>
    },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (row) => (
        <IconButton variant="contained" color="error" size="small" onClick={() => onDelClick(row.id)}><DeleteIcon color="error"/></IconButton>
      ),
    },
  ];

  const handleSearch = () => {
    const searchTerm = document.getElementById("searchs").value;
    setSearchTerm(searchTerm);

    if (searchTerm===''){
        setFilteredOwners(owners);
    }
    else{
        // Filter owners based on the search term
         const filteredItems = owners.filter((owner) =>
            (owner.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || owner.lastname.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        setFilteredOwners(filteredItems);
        setOwners(filteredOwners);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);


  return (
      <React.Fragment>
      <Stack mt={2} mb={2}>
        <AddOwner addOwner={addOwner}/>
      </Stack>
      <br/>
      <input
      id='searchs'
      className='search'
        type="text"
        placeholder="Rechercher par Nom ou Prenom"
        value={searchTerm}
        onChange={handleSearch}
      />
      <br/><br/><br/>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={owners}
          disableRowSelectionOnClick={true}
          columns={columns}
          getRowId={(row) => row._links.self.href}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="voiture suprimee"
        />
      </div>
    </React.Fragment>
  );
}

export default SearchOwner;
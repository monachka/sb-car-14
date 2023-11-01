import React, { useState, useEffect } from 'react';
//import CarList from './Carlist'; // Make sure the path to CarList is correct
import { SERVER_URL } from '../constants'; // Import your server URL from a constants file
import '../App.css';
import Snackbar from "@mui/material/Snackbar";
import { DataGrid } from "@mui/x-data-grid";
//import Button from "@mui/material/Button";
import AddCar from "./AddCar.js";
import EditCar from './EditCar.js';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
//import { blue, lightBlue } from "@mui/material/colors";
//import logo from '../logo.svg';



function SearchCar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchCars = () => {
    const token = sessionStorage.getItem('jwt');
    fetch(SERVER_URL + 'api/cars', {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        setCars(data._embedded.cars);
        setFilteredCars(data._embedded.cars); // Initialize filteredCars with all cars
      })
      .catch((err) => console.error(err));
  };

  const addCar = car => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(car),
    }).then((response) => {
      if (response.ok) {
        fetchCars();
      } else {
        alert("Something went wrong !!");
      }
    }).catch(err => console.error(err));
  };

  const updateCar = (car, link) => {
    const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token  },
      body: JSON.stringify(car),
    }).then((response) => {
      if (response.ok) {
        fetchCars();
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
            fetchCars();
            setOpen(true);
          } else {
            alert("Some thing is wrong !!!!");
          }
        })
        .catch((Err) => console.error(Err));
    }
  };
  const columns = [
    { field: "brand", headerName: "Marque", width: 200 },
    { field: "model", headerName: "Modèle", width: 200 },
    { field: "color", headerName: "Couleur", width: 200 },
    { field: "year", headerName: "Année", width: 150 },
    { field: "price", headerName: "Prix", width: 150 },
    {
      field: "_links.car.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: row => <EditCar data={row} updateCar={updateCar}/>
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
        setFilteredCars(cars);
    }
    else{
        // Filter cars based on the search term
         const filteredItems = cars.filter((car) =>
            (car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || car.model.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        setFilteredCars(filteredItems);
        setCars(filteredItems);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);


  return (
      <React.Fragment>
      <Stack mt={2} mb={2}>
        <AddCar addCar={addCar}/>
      </Stack>
      <br/>
      <input
      id='searchs'
      className='search'
        type="text"
        placeholder="Rehercher une voiture par sa Marque ou son Modele"
        value={searchTerm}
        onChange={handleSearch}
      />
      <br/><br/><br/>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={cars}
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

export default SearchCar;
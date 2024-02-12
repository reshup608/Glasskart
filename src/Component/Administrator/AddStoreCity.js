import React from 'react'
import {useState} from "react";
import {useEffect} from "react";
import { TextField,Grid,Button,Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getData, postDataAndImage } from '../FetchNodeServices';
import Swal from 'sweetalert2';
import Geocode from "react-geocode"
import {isEmpty,isEmail,isMobile,isDigits,errorMessage} from "../Checks";
import "react-toastify/dist/ReactToastify.css";


const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding:20
  
  },
  subdiv: {
      width: 800,
      height: "auto",
      background: "#f1f2f6",
      marginTop: 5,
      padding: 15,
      borderRadius: 5,
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth:480
      },

      input: {
        display: 'none',
      },
    
    
}))
export default function AddStoreCity(props){
    const [listStates, setListState]= useState([]);
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [storeName, setStoreName] = useState("");
    const [addressOne, setAddressOne] = useState("");
    const [addressTwo, setAddressTwo] = useState("");
    const [landmark, setLandmark] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [picture,setPicture] = useState({filename:'',bytes:''});

    
  const handlePicture = (event) => {
    setPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const fetchAllStates = async() => {
    var list = await getData("stores/fetchallstates");

    setListState(list.data);
  };

  const getLatLng = (address) => {
    var address=storeName+","+addressOne+","+city+","+state
    Geocode.setApiKey("xxxxx");
    Geocode.setLanguage("en");

    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
       setLatitude(lat)
       setLongitude(lng)
      },
      (error) => {
        console.error(error);
        alert(error)
      }
    );
  };

  useEffect(function () {
    fetchAllStates();
  }, []);

  const fillState = () => {
    return listStates.map((item) => {
      return <MenuItem value={item.statename}>{item.statename}</MenuItem>;
    });
  };

  const handleSubmit = async() =>{
    var err = false;
    if (isEmpty(state)) {
      err = true;

      errorMessage("State should not be blank");
    }
    if (isEmpty(city)) {
      err = true;

      errorMessage("City should not be blank");
    }
    if (isEmpty(storeName)) {
      err = true;

      errorMessage("Store Name should not be blank");
    }
    if (isEmpty(addressOne)) {
      err = true;

      errorMessage(" Address One should not be blank");
    }

    if (isEmpty(latitude)) {
      err = true;

      errorMessage("Latitude should not be blank");
    }
    if (!isDigits(latitude)) {
      err = true;

      errorMessage("Latitude must be decimal value");
    }
    if (isEmpty(longitude)) {
      err = true;

      errorMessage("Longitude should not be blank");
    }
    if (!isDigits(longitude)) {
      err = true;

      errorMessage("Longitude must be decimal value");
    }

    if (isEmpty(contactNo)) {
      err = true;

      errorMessage("Contact Number should not be blank");
    }
    if (!isMobile(contactNo)) {
      err = true;

      errorMessage("Invalid Mobile Number");
    }

    if (isEmpty(emailAddress)) {
      err = true;

      errorMessage("Email Address should not be blank");
    }
    if (!isEmail(emailAddress)) {
      err = true;

      errorMessage("Invalid Email Address");
    }

    if (isEmpty(picture.filename)) {
      err = true;

      errorMessage("Select Store Image..");
    }
    
    if(!err){
    var formData = new FormData();
    formData.append("state",state);
    formData.append("city",city);
    formData.append("storename",storeName);
    formData.append("addressone",addressOne);
    formData.append("addresstwo",addressTwo);
    formData.append("landmark",landmark);
    formData.append("latitude",latitude);
    formData.append("longitude",longitude);
    formData.append("emailaddress",emailAddress);
    formData.append("contactno",contactNo);
    formData.append("picture",picture.bytes);
    var config={headers:{"content-type":"multipart/form-data"}};
    var result=await postDataAndImage("stores/insertstore",formData,config);
    if(result)
    {Swal.fire({
      imageUrl: '/glasskart.png',
      imageWidth:200,
      title:'Glasskart.com',
      text:'Record Submitted Successfully',
    })
    }
    else{
      Swal.fire({imageUrl: '/glasskart.png',
      imageWidth:200,
    title:'Glasskart.com',
    text:'Failed to Submitted',
  })
  }
  }
}

    const classes = useStyles();
    return(
      <div className={classes.root}>
      <div className={classes.subdiv}>        
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:20,fontWeight:'bold',letterSpacing:1,padding:15}}>
                  <span><img src="/glasskart.png" width='40'></img></span>
                  <span> Add Stores </span></div>
                
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
        <InputLabel id="State-Id">State</InputLabel>
        <Select
          labelId="State-Id"
          id="StateId"
          //value={age}
          //onChange={handleChange}
          label="Select State"
          onChange={(event)=>setState(event.target.value)}
        >
          {fillState()}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth variant="outlined" label="City"  onChange={(event)=>setCity(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" label="Store Name"  onChange={(event)=>setStoreName(event.target.value)}  />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" label="Address One"  onChange={(event)=>setAddressOne(event.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" label="Address Two"  onChange={(event)=>setAddressTwo(event.target.value)}/>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" label="Landmark"  onChange={(event)=>setLandmark(event.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" label="Latitude"  onChange={(event)=>setLatitude(event.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" label="Longitude"  onChange={(event)=>setLongitude(event.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" style={{background:'#4cd137',color:'#FFF',fontSize:16,padding:12}} onClick={() =>getLatLng()} >Get Location</Button>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth variant="outlined" label="Contact Number" onChange={(event)=>setContactNo(event.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth variant="outlined" label="Email Address"  onChange={(event)=>setEmailAddress(event.target.value)} />
        </Grid>
        <Grid item xs={6} className={classes.root} >
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        onChange={(event) => handlePicture(event)}
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button style={{background:'#22a6b3'}} variant="contained" color="primary" component="span" >
          Upload
        </Button>
      </label>
        </Grid>
          <Grid item xs={6} className={classes.root}>
          <Avatar alt="Remy Sharp"  variant="rounded" src={picture.filename} style={{width:50,height:50}} />
          </Grid>
          <Grid item sm={12} className={classes.root}>
            <Button  style={{background:'#22a6b3'}} fullwidth variant="contained" color="primary"  onClick={() => handleSubmit()} >Submit Store</Button>
          </Grid>

                </Grid>
            
                
            </div>
        </div>
    )
}
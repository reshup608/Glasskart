import React,{useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Button,TextField,Avatar } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Swal from 'sweetalert2'
import { postDataAndImage } from "../FetchNodeServices";
import { isEmpty,errorMessage } from "../Checks";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding:20
    },
    subdiv: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '600px',
      height: 'auto',
      marginTop:10,
      background:'#ecf0f1',
      padding:15,
      borderRadius:5,
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    input: {
      display: 'none',
    },
  }));

  export default function AddCategories(props) {
    const [categoryName,setCategoryName] = useState("")
    const [adPicture,setAdPicture] = useState({filename:"",bytes:""})

    const classes = useStyles();

    const handlePicture = (event)=>{
        setAdPicture({
          filename:URL.createObjectURL(event.target.files[0]),
          bytes:event.target.files[0]

        })
        console.log(adPicture);
      }

      const handleSubmit = async () =>{
      var err = false;
      if(isEmpty(categoryName)){
        err = true;
        errorMessage("Category Name should not be empty");

      }

      if(isEmpty(adPicture.filename)){
        err = true;
        errorMessage("Please Add Category Picture...");
      }
      if(!err){
        var formData = new FormData();
        formData.append("categoryname",categoryName)
        formData.append("adpicture",adPicture.bytes)

        var config = { headers: { "content-type": "multipart/form-data" } };
          var result = await postDataAndImage("categories/insertcategories", formData, config);
          if(result)
          {
            Swal.fire({
              title: 'GlassKart.com',
              text: 'Your Record has been submitted successfully...',
              imageUrl: '/glasskart.png',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
            })
          }
          else
        {
          Swal.fire({
            title: 'GlassKart.com',
            text: 'Error in submitting the record...',
            imageUrl: '/glasskart.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }
      }
      }


      return(
        <div className={classes.root}>
        <div className={classes.subdiv}>
       <Grid container xs={12} spacing={1} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
         <Grid item xs={12}><div
              style={{
                width: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 1,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  letterSpacing: 1,
                  padding: 1,
                }}
              >
                <span>
                  <img alt="" src="/glasskart.png" width="40" />
                </span>{" "}
                <span>Add Category</span>
              </div>
            </div>
            </Grid>

        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Category Name"
          onChange={(event)=>setCategoryName(event.target.value)}
          />
        </Grid>

        <Grid item xs={6} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>handlePicture(event)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" style={{background:"#22a6b3"}} component="span">
          Upload
        </Button>
      </label>
        </Grid>

        <Grid item xs={6} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        <Avatar alt="Remy Sharp" src={adPicture.filename} variant="rounded" className={classes.large} />
        </Grid>

         <Grid item md={12}>
      <Button variant="contained" color="primary" style={{background:"#22a6b3" }} fullWidth onClick={()=>handleSubmit()} >Submit Category</Button>
      </Grid>
       </Grid>
        </div>
      </div>
      );

  }

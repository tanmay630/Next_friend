import React,{useEffect, useState} from 'react';
import { CssBaseline, Grid} from '@material-ui/core';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import List from './components/List/List';
import { getPlacesData } from './api';

const App = () => {

 const [places, setPlaces] = useState([]);    
 const [filteredPlaces, setfilteredPlaces] = useState([]);


 const [coords, setCoords] = useState({});
 const [bounds, setBounds] = useState({});
 const [isLoading, setisLoading] = useState(false); 
 const [childClicked, setchildClicked] = useState(null)
 const [type, setType] = useState('restaurants'); 
 const [rating, setRating] = useState('');
 
       
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoords({lat: latitude, lng: longitude})
        })
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setfilteredPlaces(filteredPlaces)
    },[rating]);


    useEffect(() => {
      if(bounds.sw && bounds.ne) {
        setisLoading(true);

        getPlacesData(type, bounds.ne,bounds.sw)
           .then((data) => {
               console.log(data);
               setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
               setfilteredPlaces([])
               setisLoading(false);
           })
        }
    }, [type, bounds]);


    return (
     <>    
             <CssBaseline />
             <Header setCoords={setCoords} />
             <Grid container spacing={3} style={{ width: '100%'}}>
                 <Grid item xs={12} md={4}>
                     <List places={filteredPlaces.length ? filteredPlaces : places}
                      childClicked={childClicked}
                      isLoading={isLoading}
                      type={type}
                      setType={setType}
                      rating={rating}
                      setRating={setRating}
                     />
                 </Grid> 
                 <Grid item xs={12} md={8}>
                     <Map 
                       setCoords={setCoords}
                       setBounds={setBounds}
                       coords={coords}  
                      places={filteredPlaces.length ? filteredPlaces : places} 
                      setchildClicked={setchildClicked}

                     />
                 </Grid>
             </Grid>
    
     </>
    );
}


export default App;
import React from "react";
import GoogleMapReact from "google-map-react";
import {useMediaQuery } from "@material-ui/core";


import useStyles from './styles';

const Map = ({latitude,longitude}) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');
    const coordinates = { lat: latitude, lng: longitude};

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCB2TCVYQMPlIroW5wmpx6A0Q8NGIoRYd0' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={''}
                onChildClick={''}
            ></GoogleMapReact>
        </div>

    )
}

export default Map;





// import React, { Component, useState } from 'react';
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Button,
//   Modal,
//   TextInput,
//   Keyboard,
//   KeyboardAvoidingView,

// } from 'react-native';
// import MapplsGL from 'mappls-map-react-native';
// import { validateCoordinates } from '../../utils/Validate';
// import polyline from 'mappls-polyline';
// import { Platform } from 'react-native';
// import exampleIcon from '../../assets/car.png'
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import FontAwesome from 'react-native-vector-icons/FontAwesome'


// const styles = {
//   icon: {
//     iconImage: exampleIcon,
//     iconAllowOverlap: true,
//     iconSize: 1,
//     iconAnchor: 'bottom',
//     iconColor: "red"
//   },
// };
// const GetDirection = props => {
//   console.log("prosssss=============map=================", props)
//   const item = props?.item;
//   const getCordinatees = useSelector(state => state?.coords?.coords)
//   console.log("eloc ============= direction====gg==map==", item?.eloc)
//   const [destinationCoordinates, setdestinationCoordinates] = useState(item?.eloc)
//   const [sourceCoordinates, setsourceCoordinates] = useState(`${getCordinatees?.coords[1]},${getCordinatees?.coords[0]}`)
//   const [center, setcenter] = useState([getCordinatees?.coords[1], getCordinatees?.coords[0]])
//   const [isVisible, setisVisible] = useState(false)
//   const [backB, setbackB] = useState('blue')
//   const [backD, setbackD] = useState('blue')
//   const [backW, setbackW] = useState('blue')
//   // const [route, setroute] = useState({"coordinates": [[77.172117, 28.503996]]})
//   const [route, setroute] = useState({})
//   const [distances, setdistance] = useState("")
//   const [duration, setduration] = useState("")
//   const [dt, setdt] = useState("")

//   const callApi = async (setProfile) => {
//     console.log("this is going to api", destinationCoordinates);
//     MapplsGL.RestApi.direction({
//       origin: sourceCoordinates,
//       destination: destinationCoordinates,
//       profile: setProfile,
//       overview: MapplsGL?.RestApi?.DirectionsCriteria?.OVERVIEW_FULL,
//       geometries: 'polyline6',
//     })
//       .then(data => {
//         console.log("data maappppp==========", JSON.stringify(data));
//         console.log("sourceCoordinates================", sourceCoordinates)
//         let routeGeoJSON = polyline?.toGeoJSON(data?.routes[0]?.geometry, 6);
//         setdt(data?.routes[0]?.geometry, 6)
//         setdistance(getFormattedDistance(data?.routes[0]?.distance))
//         setduration(getFormattedDuration(data?.routes[0]?.duration))
//         setroute(routeGeoJSON)
//         setcenter(routeGeoJSON?.coordinates[0])
//       })
//       .catch(error => {
//         console.log("this is map error", error?.message);
//       });
//   }
//   console.log("this is the current coords", getCordinatees);

//   useEffect(() => {
//     const effect = async () => {
//       setsourceCoordinates(`${getCordinatees.coords[1]},${getCordinatees.coords[0]}`)
//       setcenter([getCordinatees.coords[1], getCordinatees.coords[0]])
//       setdestinationCoordinates(`${item.eloc}`)
//       let routeGeoJSON = polyline?.toGeoJSON(dt);
//       setroute(routeGeoJSON)
//       await callApi("driving")
//       setbackD("white")
//     }
//     effect()
//   }, [])
//   const getFormattedDistance = (distance) => {
//     if (distance / 1000 < 1) {
//       return distance + ' meter';
//     }
//     let dis = distance / 1000;
//     dis = dis.toFixed(2);
//     return dis + ' kilometer';
//   }
//   const getFormattedDuration = (duration) => {
//     let min = parseInt((duration % 3600) / 60);
//     let hours = parseInt((duration % 86400) / 3600);
//     let days = parseInt(duration / 86400);
//     if (days > 0) {
//       return (
//         days +
//         ' ' +
//         (days > 1 ? 'Days' : 'Day') +
//         ' ' +
//         hours +
//         ' ' +
//         'hour' +
//         (min > 0 ? ' ' + min + ' ' + ' minute' : '')
//       );
//     } else {
//       return hours > 0
//         ? hours + ' ' + 'hour' + (min > 0 ? ' ' + min + ' ' + ' minute' : '')
//         : min + ' ' + ' minute';
//     }
//   }
//   console.log("my routen data====>",);
//   return (
//     <>
//       {route === " " &&
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator animating={true} />
//         </View>
//       }
//       <View style={{ flex: 1 }}>
//         <MapplsGL.MapView style={{ flex: 1 }}>
//           <MapplsGL.Camera
//             zoomLevel={12}
//             minZoomLevel={10}
//             maxZoomLevel={30}
//             ref={c => this.c = c}
//             centerCoordinate={center}
//           />
//           <MapplsGL.ShapeSource id="routeSource" shape={route}>
//             <MapplsGL.SymbolLayer
//               id="symbolLocationSymbols"
//               minZoomLevel={1}
//               style={styles.icon}
//             />
//             <MapplsGL.LineLayer id="routeFill" style={{
//               lineColor: 'blue',
//               lineCap: "",
//               lineWidth: 6,
//               lineOpacity: 0.8,
//               lineJoin: 'round',
//               lineBlur: 1,
//             }} />
//           </MapplsGL.ShapeSource>
//           <MapplsGL.ShapeSource id="routeSource" shape={route}>
//             <MapplsGL.SymbolLayer
//               id="symbolLocationSymbols"
//               minZoomLevel={1}
//               style={styles.icon}
//             />
//             <MapplsGL.LineLayer id="routeFill" style={{
//               lineColor: 'blue',
//               lineCap: "",
//               lineWidth: 6,
//               lineOpacity: 0.8,
//               lineJoin: 'round',
//               lineBlur: 1,
//             }} />
//           </MapplsGL.ShapeSource>
//         </MapplsGL.MapView>
//         <TouchableOpacity style={{ backgroundColor: '#d9d9d9', width: 50, height: 50, position: 'absolute', marginHorizontal: 20, marginVertical: 20 }} onPress={() => callApi("driving")}>
//           <FontAwesome name='refresh' size={30} color={'#000'} style={{ padding: 10, }} />
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// }


// export default GetDirection;


import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import polyline from 'mappls-polyline';
import exampleIcon from '../../assets/car.png';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = {
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    backgroundColor: '#d9d9d9',
    width: 50,
    height: 50,
    position: 'absolute',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  refreshIcon: {
    padding: 10,
  },
  distanceInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  icon: {
    iconImage: exampleIcon,
    iconAllowOverlap: true,
    iconSize: 1,
    iconAnchor: 'bottom',
    iconColor: "red"
  },
  lineStyle: {
    lineColor: 'blue',
    lineCap: "round",
    lineWidth: 6,
    lineOpacity: 0.8,
    lineJoin: 'round',
    lineBlur: 1,
  }
};

const GetDirection = props => {
  const item = props?.item;
  const getCordinatees = useSelector(state => state?.coords?.coords);
  
  // Initialize state variables
  const [isLoading, setIsLoading] = useState(true);
  const [destinationCoordinates, setDestinationCoordinates] = useState(item?.eloc || "");
  const [sourceCoordinates, setSourceCoordinates] = useState("");
  const [center, setCenter] = useState([0, 0]);
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [polylineGeometry, setPolylineGeometry] = useState("");
  
  const cameraRef = useRef(null);
  
 
  const getFormattedDistance = (distance) => {
    if (distance / 1000 < 1) {
      return distance + ' meter';
    }
    let dis = distance / 1000;
    dis = dis.toFixed(2);
    return dis + ' kilometer';
  };
  
  // Format duration to be user-friendly
  const getFormattedDuration = (duration) => {
    let min = parseInt((duration % 3600) / 60);
    let hours = parseInt((duration % 86400) / 3600);
    let days = parseInt(duration / 86400);
    
    if (days > 0) {
      return (
        days +
        ' ' +
        (days > 1 ? 'Days' : 'Day') +
        ' ' +
        hours +
        ' ' +
        'hour' +
        (min > 0 ? ' ' + min + ' ' + ' minute' : '')
      );
    } else {
      return hours > 0
        ? hours + ' ' + 'hour' + (min > 0 ? ' ' + min + ' ' + ' minute' : '')
        : min + ' ' + ' minute';
    }
  };

  // Call the Mappls direction API
  const callApi = async (profile = "driving") => {
    setIsLoading(true);
    
    try {
      if (!sourceCoordinates || !destinationCoordinates) {
        console.log("Source or destination coordinates missing");
        setIsLoading(false);
        return;
      }
      
      const response = await MapplsGL.RestApi.direction({
        origin: sourceCoordinates,
        destination: destinationCoordinates,
        profile: profile,
        overview: MapplsGL?.RestApi?.DirectionsCriteria?.OVERVIEW_FULL,
        geometries: 'polyline6',
      });
      
      if (response?.routes && response.routes[0]) {
        const routeGeometry = response.routes[0].geometry;
        setPolylineGeometry(routeGeometry);
        
        const routeGeoJSON = polyline.toGeoJSON(routeGeometry, 6);
        setRoute(routeGeoJSON);
        
        if (routeGeoJSON?.coordinates && routeGeoJSON.coordinates.length > 0) {
          setCenter(routeGeoJSON.coordinates[0]);
        }
        
        setDistance(getFormattedDistance(response.routes[0].distance));
        setDuration(getFormattedDuration(response.routes[0].duration));
      } else {
        console.log("No routes found in response");
      }
    } catch (error) {
      console.log("Direction API error:", error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initialize the component
  useEffect(() => {
    const initializeComponent = async () => {
      if (getCordinatees?.coords) {
        const sourceCoords = `${getCordinatees.coords[1]},${getCordinatees.coords[0]}`;
        setSourceCoordinates(sourceCoords);
        setCenter([getCordinatees.coords[1], getCordinatees.coords[0]]);
        
        if (item?.eloc) {
          setDestinationCoordinates(item.eloc);
          await callApi("driving");
        }
      }
    };
    
    initializeComponent();
  }, [getCordinatees, item]);

  return (
    <View style={styles.container}>
      {isLoading && !route ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <>
          <MapplsGL.MapView style={styles.container}>
            <MapplsGL.Camera
              zoomLevel={12}
              minZoomLevel={10}
              maxZoomLevel={30}
              ref={cameraRef}
              centerCoordinate={center}
            />
            
            {route && (
              <MapplsGL.ShapeSource id="routeSource" shape={route}>
                <MapplsGL.SymbolLayer
                  id="symbolLocationSymbols"
                  minZoomLevel={1}
                  style={styles.icon}
                />
                <MapplsGL.LineLayer 
                  id="routeFill" 
                  style={styles.lineStyle} 
                />
              </MapplsGL.ShapeSource>
            )}
          </MapplsGL.MapView>
          
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={() => callApi("driving")}
          >
            <FontAwesome 
              name='refresh' 
              size={30} 
              color={'#000'} 
              style={styles.refreshIcon} 
            />
          </TouchableOpacity>
          
          {distance && duration && (
            <View style={styles.distanceInfo}>
              <Text style={styles.infoText}>Distance: {distance}</Text>
              <Text style={styles.infoText}>Duration: {duration}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default GetDirection;
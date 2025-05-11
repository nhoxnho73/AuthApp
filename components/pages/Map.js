import React, { useEffect, useState, useRef } from 'react';
import { View, PermissionsAndroid, Platform, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import useSpinner from "../../hooks/useSpinnerHook";
export default function MapScreen() {
    const [location, setLocation] = useState(null);  // Vị trí của người dùng
    const [region, setRegion] = useState(null);     // Region dùng để zoom
    const [destination, setDestination] = useState(null);
    const { loading, showSpinner, hideSpinner } = useSpinner(); // Trạng thái đang lấy vị trí
    const mapRef = useRef(null);

    useEffect(() => {
        showSpinner(true);
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Permission denied');
                    hideSpinner();
                    return;
                }
            }

            Geolocation.getCurrentPosition(
                pos => {
                    const { latitude, longitude } = pos.coords;
                    const currentLoc = { latitude, longitude };
                    console.log('Current location:', currentLoc);
                    setLocation(currentLoc);  // Set vị trí
                    const initialRegion = {
                        ...currentLoc,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    };
                    setRegion(initialRegion);
                    hideSpinner(); // Đã lấy xong vị trí

                    // Zoom đến vị trí hiện tại
                    mapRef.current?.animateToRegion({
                        ...currentLoc,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                },
                error => {
                    console.log('Geolocation error:', error.message);
                    hideSpinner(); // Lỗi, hoàn thành loading
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };

        requestLocationPermission();
    }, []);

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        // setLocation(coordinate);
        setDestination(coordinate); // Đặt luôn làm điểm B
        setRegion({
            ...coordinate,
            latitudeDelta: region?.latitudeDelta || 0.05,
            longitudeDelta: region?.longitudeDelta || 0.05,
        });
    };

    const zoom = (factor) => {
        if (!region) return;
        const newRegion = {
            ...region,
            latitudeDelta: region.latitudeDelta * factor,
            longitudeDelta: region.longitudeDelta * factor,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 300);
    };

    // Chỉ render Map khi đã có vị trí
    if (loading) {
        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator style={styles.spinner} size="large" color="#007AFF" />}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={true}
                region={region} // sử dụng region thay vì initialRegion
                onPress={handleMapPress}
            >
                {location && (
                    <Marker
                        coordinate={location}
                        title="Vị trí của bạn"
                        description="Đây là vị trí hiện tại"
                    />
                )}
                {destination && <Marker coordinate={destination} title="Điểm đến" />}

                {location && destination && (
                    <>
                        {console.log("Drawing polyline from:", location, "to:", destination)}
                        <Polyline
                            coordinates={[location, destination]}
                            strokeColor="#000"
                            strokeWidth={4}
                        />
                    </>
                )}
            </MapView>
            <View style={styles.zoomControls}>
                <TouchableOpacity style={styles.zoomButton} onPress={() => zoom(0.5)}>
                    <Text style={styles.zoomText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.zoomButton} onPress={() => zoom(2)}>
                    <Text style={styles.zoomText}>−</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
    spinner: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    },
    zoomControls: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'column',
    },
    zoomButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    zoomText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
import { calculateRegion } from "@/lib/map";
import { Text, View } from "react-native"
import {useDriverStore, useLocationStore} from "@/store"


const Map = () => {

    const {userLongitude, userLatitude, destinationlatitude, destinationLongitude} = useLocationStore();

    const {selectedDriver, setDrivers} = useDriverStore()

    const region = calculateRegion({
        userLongitude, 
        userLatitude,
        destinationlatitude,
        destinationLongitude
    })

    return (
        <MapView
        provider={PROVIDER_DEFAULT}
        className="w-full h-full rounded-2xl"
        tintColor="black"
        mapType="mutedStandard"
        showPointOfInterest={false}
        initialRegion={region}
        showsUserLocation={true}
        userInterfaceStyle="light"
        >
                <Text>Map</Text>
        </MapView>
    )
}

export default Map
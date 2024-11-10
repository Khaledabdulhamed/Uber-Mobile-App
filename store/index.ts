import {create} from "zustand"
import { DriverStore, LocationStore, MarkerData } from "@/types/type"

export const useLocationStore = create<LocationStore>((set) => ({
    userLongitude: null,
    userLatitude: null,
    userAddress: null,
    destinationLongitude: null,
    destinationLatitude: null,
    destinationAddress: null,
    setUserLocation: ({
        latitude, longitude, address
    }: {latitude: Number, longitude: Number, address: String }) => {
    set(() => ({
        userLatitude: latitude,
        userLongitude: longitude,
        userAddress: address
    }));
}, 

setDestinationLocation: ({
    latitude, longitude, address
}: {latitude: Number, longitude: Number, address: String }) => {
set(() => ({
    destinationLatitude: latitude,
    destinationLongitude: longitude,
    destinationAddress: address
}));
},

}))

export const useDriverStore = create<DriverStore>((set)=> ({
    drivers: [] as MarkerData[],
    selectedDriver: null,
    setSelectedDriver:(driverId: Number)=>
        set(() => ({selectedDriver: driverId}))
}))
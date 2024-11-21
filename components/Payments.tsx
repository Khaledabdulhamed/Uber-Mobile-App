import { Alert, Text, View } from "react-native"
import CustomButton from "./CustomButton"
import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";


const Payment = () => {

    export default function CheckoutScreen() {
        const { initPaymentSheet, presentPaymentSheet } = useStripe();
        const [success, setSuccess] = useState(false)
      
        const confirmHandler = async (paymentMethod, shouldSavePaymentMethod, intentCreationCallback) => {
            // Make a request to your own server.
            const response = await fetch(`${API_URL}/create-intent`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
            }});
            // Call the `intentCreationCallback` with your server response's client secret or error
            const { client_secret, error } = await response.json();
            if (client_secret) {
              intentCreationCallback({clientSecret: client_secret});
            } else {
              intentCreationCallback({error});
            }
          }

        const initializePaymentSheet = async () => {

               
          
       
      
          
           const openPaymentSheet = async () => {

            await initializePaymentSheet()

            const { error } = await presentPaymentSheet();

            if (error) {
              Alert.alert(`Error code: ${error.code}`, error.message);
            } else {
              setSuccess(true)
            }
          };
           }


    return (
        <>
            <CustomButton
            title="Confirm Ride"
            className="my-10"
            onPress={openPaymentSheet}
            /> 
        </>
    )
}

export default Payment
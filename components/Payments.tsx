import { Text, View } from "react-native"
import CustomButton from "./CustomButton"
import { useStripe } from "@stripe/stripe-react-native";


const Payment = () => {

    export default function CheckoutScreen() {
        const { initPaymentSheet, presentPaymentSheet } = useStripe();
      
      
        const initializePaymentSheet = async () => {
      
          const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            intentConfiguration: {
                mode: {
                    amount: 1099,
                    currencyCode: "USD"
                },
                confirmHandler: confirmHandler,
            }
          });
          if (error) {

          }
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
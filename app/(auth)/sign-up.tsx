import CustomButton from "@/components/CustomButton"
import InputField from "@/components/InputField"
import OAuth from "@/components/OAuth"
import { icons, images } from "@/constants"
import { useSignUp } from "@clerk/clerk-expo"
import { Link, router } from "expo-router"
import { useState } from "react"
import {  Alert, Image, ScrollView, Text, View } from "react-native"
import {  ReactNativeModal } from "react-native-modal"
import { SafeAreaView } from "react-native-safe-area-context"

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp()
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [verfication, setVerfication] = useState({
        state: "default",
        error: "",
        code: "",
    })
    const onSignUpPress = async () => {
        if (!isLoaded) {
          return
        }
    
        try {
          await signUp.create({
            emailAddress: form.email,
            password: form.password,
          })
    
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    
          setVerfication({
            ...verfication,
            state: 'pending'
          })
        } catch (err: any) {
          Alert.alert("Error", err.errors[0].longMessage)
        }
      }
    
      const onPressVerify = async () => {
        if (!isLoaded) {
          return
        }
    
        try {
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code: verfication.code,
          })
    
          if (completeSignUp.status === 'complete') {
            //TODO :create a database user!
            await setActive({ session: completeSignUp.createdSessionId })
           setVerfication({...verfication, state: "success"})
          } else {
            setVerfication({...verfication, error:"Verfication faild", state: "faild"})
        }
        } catch (err: any) {
            setVerfication({...verfication, error:err.errors[0].longMessage, state: "faild"})
        }
      }

    

    return (
       <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
            <View className="relative w-full h-[250px]">
            <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
            <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account 
            </Text>
            </View>
            
            <View className="p-5">
            <InputField 
            label="Name"
            placeholder = "Enter your Name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({...form, name:value})}
            />
            <InputField 
            label="Email"
            placeholder = "Enter your Email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({...form, email:value})}
            />
            <InputField 
            label="Password"
            placeholder = "Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({...form, password:value})}
            />

            <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6" />

            <OAuth />

            <Link href="/sign-in" className="text-lg text-center text-general-200 mt-10">
            <Text>Already have an account?</Text>
            <Text className="text-primary-500">Log In</Text>
            </Link>
            </View>

            <ReactNativeModal isVisible ={verfication.state === 'pending'} 
            onModalHide={() => {if(verfication.state === 'success') setShowSuccessModal(true)} }>
                <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-2xl font-JakartaExtraBold mb-2">
                Verification
                </Text>
                
                <Text className="font-Jakarta mb-5">
                We've sent a verfication code to {form.email}
                </Text>

                <InputField 
                label="Code"
                 icon={icons.lock}
                 placeholder="12345" 
                 value={verfication.code}
                  keyboardType="numeric"
                  onChangeText={(code) => setVerfication({...verfication, code})}
                  />

                  {verfication.error && (
                    <Text className="text-red-500 text-sm mt-1">
                      {verfication.error}
                    </Text>
                  ) }
                  <CustomButton
                   title="Verify Email"
                    onPress={onPressVerify}
                    className="mt-5 bg-success-500" />

                </View>
            </ReactNativeModal>

            <ReactNativeModal isVisible ={showSuccessModal}>
              <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Image
                source={images.check}
                className="w-[110px] h-[110px] mx-auto my-5"
                />
                <Text className="text-3xl font-JakartaBold text-center">
                  Verified
                </Text>
                
                <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                  You have successfully verified your account.
                </Text>

                <CustomButton 
                title="Browse Home"
                onPress={() =>
                  { setShowSuccessModal(false)
                    router.push("/(root)/(tabs)/home")}}
                className="mt-5"
                
                 />

              </View>
            </ReactNativeModal>
        </View>
       </ScrollView>
    )
}
export default SignUp
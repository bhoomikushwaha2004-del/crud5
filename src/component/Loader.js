import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

export default function Loader() {
    return(
        <>
        <ActivityIndicator size={'large'} color={'#5500dc'} style={styles.loader} />
        <Text style={{marginLeft:30,fontSize:17}}>Please wait!!! While your screen is Loading</Text>
        </>
    )
}

const styles = StyleSheet.create({
    loader:{
        height:100,
        width:100,
        justifyContent:'center',
        alignContent:'center',
        marginLeft:150,
        marginTop:300
    }
})
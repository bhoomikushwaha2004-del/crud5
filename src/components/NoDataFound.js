import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";


export default function NoDataFound({navigation}) {

    const filtnvg=() => {
        navigation.navigate('Filter')
    }

    return(
        <>
        <Image source={require('../assests/no-data.jpg')} style={{height:300,width:300,marginLeft:40,marginTop:50}}/>
        <Text style={styles.txtNoData}>No Data Found💔</Text>
        <Text style={styles.txt}>Try using another Filter </Text>
        <TouchableOpacity style={styles.btn} onPress={filtnvg}>
            <Text style={{color:'white',margin:10,fontSize:20,marginLeft:20}}>Go Back</Text>
        </TouchableOpacity>
        </>
    )

}

const styles = StyleSheet.create({
    txtNoData:{
        fontSize:25,
        marginLeft:100,
        color:'rgba(33, 0, 153, 0.53)',
        marginTop:20
    },
    txt:{
        fontSize:19,
        marginLeft:100
    },
    btn:{
        height:50,
        width:130,
        borderWidth:1,
        borderColor:'pink',
        marginLeft:130,
        borderRadius:30,
        backgroundColor:'rgba(61, 110, 110, 0.6)',
        marginTop:30,
        elevation:8
    }
})
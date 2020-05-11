import React, {Component} from "react";
import {Image, Text, View} from "react-native";
import {styles} from "../OrderStyle";


export default class Product extends Component {


    render() {
        return (
            <View style={styles.productParent}>
                <Image style={styles.productImage} source={this.props.image}/>
                <View style={styles.productTextParent}>
                    <Text style={styles.productText}>{this.props.name}</Text>
                    <Text style={styles.productText}>{this.props.quantity}</Text>
                    <Text style={styles.productText}>{"Rs. "+this.props.price}</Text>
                </View>
            </View>

        );

    }


}
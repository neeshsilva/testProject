import React, {PureComponent} from "react";
import {FlatList, View} from "react-native";
import {styles} from "../OrderStyle";
import Product from "./Product";


export default class ProductList extends PureComponent {


    renderSeparator = () => {
        return (
            <View style={styles.orderListSeperator}/>
        );
    }

    getProduct = (item) => {
        return <Product price={item.price}
                        name={item.name}
                        image={(item.imageURL?{uri:item.imageURL}:require('../../../../assets/defaultImage.png'))}
                        quantity={item.quantity}/>
    }


    render() {
        return (
            <View style={styles.orderListContainer}>
                <FlatList
                    data={this.props.items}
                    renderItem={({item}) =>
                        this.getProduct(item)
                    }
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );

    }
}

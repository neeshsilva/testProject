import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, ImageBackground, Modal, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './OrderStyle';

import {changeFilteringState, requestOrders} from '../actions/orderActions';

class OrderFilteringModal extends Component {
    states = [
        'ATTENDED',
        'READY_TO_DELIVER',
        'READY_TO_PICK_UP',
        'DISPATCHED',
        'COMPLETED',
    ];

    changeStateFilter = state => {
        // console.log('State ', state);
        if (state === 'ALL_ORDERS') {
            this.props.changeFilteringState([...this.states]);
        } else {
            this.props.changeFilteringState([state]);
        }
        this.props.alterModalDisplay(false);
    };

    render() {
        let {viewModal, alterModalDisplay} = this.props;
        return (
            <Modal animationType="fade" transparent={true} visible={viewModal}>
                <View style={{marginTop: 22}} style={styles.orderFilterModal}>
                    <TouchableOpacity
                        style={styles.orderFilterModalExit}
                        onPress={() => {
                            // console.log('Clicked');
                            alterModalDisplay(false);
                        }}
                        onRequestClose={() => {
                            // console.log('Clicked2');
                            alterModalDisplay(false);
                        }}
                    />
                    <View style={styles.orderFilterModalContent}>
                        <Text style={styles.orderStateFilterMainText}>Status</Text>
                        <View style={styles.orderStateFilterContent}>
                            <TouchableOpacity
                                style={styles.orderStateFilterItem}
                                onPress={() => this.changeStateFilter('ALL_ORDERS')}
                            >
                                <ImageBackground style={styles.filterAllCategoriesImg}>
                                    <Image
                                        style={styles.stateIdentifier}
                                        source={require('../../../assets/allOrders.png')}
                                    />
                                </ImageBackground>
                                <Text style={styles.stateIdentifierText}>All orders</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.orderStateFilterItem}
                                onPress={() => this.changeStateFilter(this.states[0])}
                            >
                                <View
                                    style={{
                                        ...styles.stateIdentifier,
                                        backgroundColor: '#00D245',
                                    }}
                                />
                                <Text style={styles.stateIdentifierText}>Attended</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.orderStateFilterItem}
                                onPress={() => this.changeStateFilter(this.states[1])}
                            >
                                <View
                                    style={{
                                        ...styles.stateIdentifier,
                                        backgroundColor: '#FDDB00',
                                    }}
                                />
                                <Text style={styles.stateIdentifierText}>Ready to deliver</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.orderStateFilterItem}
                                onPress={() => this.changeStateFilter(this.states[2])}
                            >
                                <View
                                    style={{
                                        ...styles.stateIdentifier,
                                        backgroundColor: '#2790D3',
                                    }}
                                />
                                <Text style={styles.stateIdentifierText}>Ready to pickup</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.orderStateFilterItem}
                                onPress={() => this.changeStateFilter(this.states[3])}
                            >
                                <View
                                    style={{
                                        ...styles.stateIdentifier,
                                        backgroundColor: '#A2A2A2',
                                    }}
                                />
                                <Text style={styles.stateIdentifierText}>Dispatched</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.orderStateFilterItem}
                                onPress={() => this.changeStateFilter(this.states[4])}
                            >
                                <View
                                    style={{
                                        ...styles.stateIdentifier,
                                        backgroundColor: '#00D245',
                                    }}
                                />
                                <Text style={styles.stateIdentifierText}>Completed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default connect(
    null,
    {changeFilteringState, requestOrders},
)(OrderFilteringModal);

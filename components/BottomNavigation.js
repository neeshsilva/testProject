import React from 'react';
import {Image, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {changeFilteringState, requestOrders} from './orders/actions/orderActions';

const FILTERING_STATUES = ['PENDING'];
const ATENDED_FILTERING_STATES = [
    'ATTENDED',
    'READY_TO_DELIVER',
    'READY_TO_PICKUP',
    'DISPATCHED',
];

const BottomNavigation = props => {
    return (
        <View style={styles.bottomNavigation}>
            <TouchableOpacity
                style={styles.imageContainer}
                activityOpacity={0.5}
                onPress={() => {
                    props.changeFilteringState([]);
                    props.navigation.navigate('ChatHistory');
                }}>
                <ImageBackground style={styles.imageContainer}>
                    <Image
                        style={styles.image4}
                        source={require('../assets/speechBubble.png')}
                    />
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.imageContainer}
                activityOpacity={0.5}
                onPress={() => {
                    if (props.filteringState.length > 1 || !props.filteringState.length) {
                        props.changeFilteringState(['PENDING']);
                        props.navigation.navigate('Orders');
                    }
                }}>
                <ImageBackground style={styles.imageContainer}>
                    <Image
                        style={styles.image1}
                        source={require('../assets/notification.png')}
                    />
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.imageContainer}
                activityOpacity={0.5}
                onPress={() => {
                    if (
                        props.filteringState.length === 1 ||
                        !props.filteringState.length
                    ) {
                        props.changeFilteringState([
                            'ATTENDED',
                            'READY_TO_DELIVER',
                            'READY_TO_PICK_UP',
                            'DISPATCHED',
                            'COMPLETED',
                        ]);
                        props.navigation.navigate('Orders');
                    }
                }}>
                <ImageBackground style={styles.imageContainer}>
                    <Image
                        style={styles.image2}
                        source={require('../assets/ordersBlack.png')}
                    />
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.imageContainer}
                activityOpacity={0.5}
                onPress={() => {
                    props.navigation.navigate('Profile');
                }}>
                <ImageBackground style={styles.imageContainer}>
                    <Image
                        style={styles.image3}
                        source={require('../assets/profileBottomNav.png')}
                    />
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

export const styles = StyleSheet.create({
    bottomNavigation: {
        width: wp('100%'),
        height: hp('7%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {width: 10, height: 12},
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 4,
        backgroundColor: 'white',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('8%'),
        width: wp('25%'),
        // alignItems: "center"
    },
    image1: {
        height: 24,
        width: 22,
        backgroundColor: 'white',
    },
    image2: {
        height: 24,
        width: 22,
        backgroundColor: 'white',
    },
    image3: {
        height: 24,
        width: 24,
        backgroundColor: 'white',
    },
    image4: {
        height: 24,
        width: 26,
        backgroundColor: 'white',
    },
});

function mapStateToProps(state) {
    return {
        token: state.login.token,
        filteringState: state.orders.filteringState,
    };
}

export default connect(mapStateToProps, {
    changeFilteringState,
    requestOrders,
})(BottomNavigation);

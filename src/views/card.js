import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, Text, TouchableHighlight, View, Animated } from "react-native";

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
    let flipRotation = 0;
    const flipAnimation = useRef(new Animated.Value(0)).current;
    flipAnimation.addListener(({ value }) => flipRotation = value);

    const flipToFrontStyle = {
        transform: [
            {
                rotateY: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["0deg", "180deg"]
                })
            }
        ]
    };

    const flipToBackStyle = {
        transform: [
            {
                rotateY: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["180deg", "360deg"]
                })
            }
        ]
    };

    if (isFlipped || isInactive) {
        flipToFront();
    } else {
        flipToBack();
    }

    const onPress = () => {
        if (!isFlipped && !isDisabled) {
            onClick(index);
        }
    }

    function flipToFront() {
        Animated.timing(flipAnimation, {
            toValue: 180,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    function flipToBack() {
        Animated.timing(flipAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.item} onPress={onPress} >
                <View>
                    <Animated.View style={[styles.flipCard, styles.flipCardBack, flipToFrontStyle]}>
                        <Text style={styles.buttonText}>?</Text>
                    </Animated.View>
                    <Animated.View style={[styles.flipCard, flipToBackStyle]}>
                        <Text style={styles.buttonText}>{card.id}</Text>
                    </Animated.View>
                </View>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    item: {
        flex: 1,
        margin: 3,
    },
    flipCard: {
        flex: 1,
        borderRadius: 6,
        borderWidth: 3,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: Dimensions.get('window').width / 3 + 28,
        backgroundColor: '#5f9ea0',
        backfaceVisibility: 'hidden',
    },
    flipCardBack: {
        backgroundColor: '#ffd700',
        position: 'absolute',
        top: 0,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30
    }
});

export default Card;
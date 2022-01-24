import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, Dimensions, FlatList, View, Button, Alert } from 'react-native';
import Card from './card';

//Shuffle Cards
function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

function generateRandomNumbersToString() {
    const min = 1;
    const max = 100;
    const random = parseInt(min + (Math.random() * (max - min)));
    return random.toString()
}

function isInArray(value, array) {
    const isValue = array.find((item) => item.id === value.id)
    return isValue != undefined
}

function prepareListOfRandomNumbers() {
    const collectionOfRandomNumber = [];

    while (collectionOfRandomNumber.length < 6) {
        const object = { id: generateRandomNumbersToString() };
        console.log(isInArray(object, collectionOfRandomNumber))
        if (isInArray(object, collectionOfRandomNumber) === false) {
            collectionOfRandomNumber.push(object);
        }
    }
    console.log(collectionOfRandomNumber);
    return collectionOfRandomNumber;
}

var CARD_PAIRS_VALUE = prepareListOfRandomNumbers();
const numColumns = 3;
const size = Dimensions.get('window').width / numColumns;

const Cards = () => {
    const [cards, setCards] = useState(
        shuffleCards.bind(null, CARD_PAIRS_VALUE.concat(CARD_PAIRS_VALUE))
    );
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
    const [moves, setMoves] = useState(0);

    const timeout = useRef(null);

    const disable = () => {
        setShouldDisableAllCards(true);
    };

    const enable = () => {
        setShouldDisableAllCards(false);
    };

    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === CARD_PAIRS_VALUE.length) {
            Alert.alert(
                "Game Over 🥳",
                "Congratulations, you took only: " + moves + " Steps",
                [
                    { text: "Play Again", onPress: () => handleRestart() }
                ]
            );
        }
    };
    const evaluate = () => {
        const [first, second] = openCards;
        enable();
        if (cards[first].id === cards[second].id) {
            setClearedCards((prev) => ({ ...prev, [cards[first].id]: true }));
            setOpenCards([]);
            return;
        }

        timeout.current = setTimeout(() => {
            setOpenCards([]);
        }, 500);
    };

    const handleCardClick = (index) => {
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index]);
            disable();
            setMoves((moves) => moves + 1);
        } else {
            clearTimeout(timeout.current);
            setOpenCards([index]);
        }
    };

    useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
            timeout = setTimeout(evaluate, 500);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [openCards]);

    useEffect(() => {
        checkCompletion();
    }, [clearedCards]);

    const checkIsFlipped = (index) => {
        return openCards.includes(index);
    };

    const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.id]);
    };

    const handleRestart = () => {
        setClearedCards({});
        setOpenCards([]);
        setMoves(0);
        setShouldDisableAllCards(false);
        CARD_PAIRS_VALUE = prepareListOfRandomNumbers();
        setCards(shuffleCards(CARD_PAIRS_VALUE.concat(CARD_PAIRS_VALUE)));
    };

    return (
        <View>
            <View style={styles.headerContainer}>
                <Button title='RESET' style={styles.reset} onPress={handleRestart} />
                <Text style={styles.step}>STEP {moves}</Text>
            </View>
            <FlatList
                data={cards}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <Card
                            key={index}
                            card={item}
                            index={index}
                            isDisabled={shouldDisableAllCards}
                            isInactive={checkIsInactive(item)}
                            isFlipped={checkIsFlipped(index)}
                            onClick={handleCardClick}
                        />
                    </View>
                )}
                keyExtractor={item => item.id}
                numColumns={numColumns} />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginLeft: 10,
        marginRight:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50
    },
    itemContainer: {
        width: size,
        height: size + 40,
    },
    item: {
        flex: 1,
        margin: 3,
    },
    step: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    reset: {
        color: 'blue',
    }
});


export default Cards;

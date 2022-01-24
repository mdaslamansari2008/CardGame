
import React from 'react';
import Card from '../src/views/card';
import { render, fireEvent } from '@testing-library/react-native';

describe('Card View', () => {
    test('Card component with Not toHaveBeenCalled', () => {
        const handlePress = jest.fn();

        const { getByTestId } = render(
            <Card
                key={2}
                card={'id:5'}
                index={2}
                isDisabled={false}
                isInactive={false}
                isFlipped={false}
                onClick={handlePress}
            />
        );

        fireEvent(getByTestId('cardTapTestID'), 'handlePress');

        expect(handlePress).not.toHaveBeenCalled();
    });


    test('Card component with toHaveBeenCalled', () => {
        const handlePress = jest.fn();

        const { getByTestId } = render(
            <Card
                key={2}
                card={'id:5'}
                index={2}
                isDisabled={false}
                isInactive={false}
                isFlipped={false}
                onClick={handlePress}
            />
        );

        fireEvent.press(getByTestId('cardTapTestID'));

        expect(handlePress).toHaveBeenCalled();
    });

});

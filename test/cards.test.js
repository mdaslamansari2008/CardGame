
import React from 'react';
import Cards from '../src/views/cards';
import {render, fireEvent} from '@testing-library/react-native';

describe('Header View Text Verification', () => {
    it('step is not null', () => {
        const {getByTestId} = render(<Cards />);
        expect(getByTestId('stepsTestID')).not.toBeNull();
    });
    
    it('Button RESET title present', () => {
        const {queryByText} = render(<Cards />);
        expect(queryByText('RESET')).not.toBeNull();
    });
});

describe('Cards View', () => {
    it('Collection of cards', () => {
        const {getAllByTestId} = render(<Cards />);
        
        const listOfCard = getAllByTestId('showCardTestID');
        expect(listOfCard.length).toEqual(12)
    });

    it('All hidden number', () => {
        const {getAllByTestId} = render(<Cards />);
        
        const listOfCard = getAllByTestId('hidderCardTestID');
        expect(listOfCard).toHaveLength(12)
    });
});

describe('FLatList View', () => {
    it('FlatList not null', () => {
        const {getByTestId} = render(<Cards />);
        expect(getByTestId('listOfCardsFlatListTestID')).not.toBeNull();
    });
});

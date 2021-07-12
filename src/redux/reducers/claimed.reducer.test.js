import claimedReducer from './claimed.reducer';

describe('CLAIMED REDUCER TEST', () => {
    
    test('SET_CLAIM', () => {
        const action = {
            type: 'SET_CLAIM',
            payload: {
                available: false,
                itemId: 6
            }
        }
        const state = [];
        expect(claimedReducer(state, action)).toEqual({available: false, itemId: 6})
    })

})




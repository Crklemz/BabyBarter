import toyReducer from './toy.reducer';

describe('TOY REDUCER TEST', () => {
    
    test('SET_TOYS', () => {
        const action = {
            type: 'SET_TOYS',
            payload: {
                id: 1
            }
        }
        const state = [];
        expect(toyReducer(state, action)).toEqual({id: 1})
    })

})
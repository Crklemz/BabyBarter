import userInfoReducer from './userInfo.reducer';

describe('USERINFO REDUCER TESTS', () => {
    
    test('SET_USERINFO', () => {
        const action = {
            type: 'SET_USERINFO',
            payload: {
                id: 1
            }
        }
        const state = {};
        expect(userInfoReducer(state, action)).toEqual({id: 1})
    })
})
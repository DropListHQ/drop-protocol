import { Dispatch } from 'redux';
import * as actions from './actions';
import { UserActions } from './types';

function sleep(timeout: number) {
    return new Promise((resolve) => setTimeout(() => resolve(true), timeout))
}
export async function addItemAsync(dispatch: Dispatch<UserActions>, item: string) {
    dispatch(actions.setLoading(true));
    await sleep(1000);
    dispatch(actions.setAddress(item));
    dispatch(actions.setLoading(false));
}
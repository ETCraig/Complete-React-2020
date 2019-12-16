import { call, put, takeEvery } from 'redux-saga/effects';

import { convertCollectionsSnapShotToMap, firestore } from '../../firebase/firebasae.utils';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';
import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');

        const snapShot = yield collectionRef.get();

        const collectionsMap = yield call(convertCollectionsSnapShotToMap, snapShot);

        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }

    // collectionRef.get().then(snapshot => {
    //     const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
    //     dispatch(fetchCollectionsSuccess(collectionsMap));
    // }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart() {
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
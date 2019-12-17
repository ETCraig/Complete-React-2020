import { takeLatest, put, all, call } from 'redux-saga/effects';

import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from '../../firebase/firebasae.utils';
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess } from './user.actions';
import UserActionTypes from './user.types';

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapShotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* getSnapShotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user);
    } catch (error) {
        put(signInFailure(error.message));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error.message));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_ACTION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated),
        call(onSignOutStart)
    ]);
}
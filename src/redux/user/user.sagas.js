import {takeLatest,put,all,call, takeLeading} from 'redux-saga/effects';
import UserActionTypes from './user.types'
import {auth, googleProvider, createUserProfileDocument, getCurrentUser} from '../../firebase/firebase.utils';
import {googleSignInSuccess,googleSignInFailure,
        emailSignInSuccess,emailSignInFailure,
        signOutSuccess,signOutFailure,
        signUpSuccess,signUpFailure} from './user.action';

export function* getSnapShotUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call( createUserProfileDocument,userAuth, additionalData );
        const userSnapShot = yield userRef.get()
        yield put(
            emailSignInSuccess({id: userSnapShot.id, ...userSnapShot.data()})
        )
        
    } catch (error) {
        yield put(emailSignInFailure(error))
    }
       

}




export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider)
        
        const userRef = yield call(createUserProfileDocument,user)

        const userSnapShot = yield userRef.get()

        yield put(
            googleSignInSuccess({id: userSnapShot.id, ...userSnapShot.data() })
        )

    } catch (error) {
        yield put(googleSignInFailure(error))
    }
}


export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}



export function* signInWithEmail({payload: {email,password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email,password);
        const userRef = yield call( createUserProfileDocument,user );
        const userSnapShot = yield userRef.get()
        yield put(
            emailSignInSuccess({id: userSnapShot.id, ...userSnapShot.data()})
        )
        
    } catch (error) {
        yield put(emailSignInFailure(error))

    }


}

export function* onEmailSignIn() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail)
}




export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if (!userAuth) return;
        const userRef = yield call( createUserProfileDocument,userAuth );
        const userSnapShot = yield userRef.get()
        yield put(
            emailSignInSuccess({id: userSnapShot.id, ...userSnapShot.data()})
        )
        
    } catch (error) {
        yield put(emailSignInFailure(error))
    }

}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}


export function* signOut() {
    try {
        yield auth.signOut();
        yield (put(signOutSuccess()))

    } catch (error) {
        yield (put(signOutFailure(error)))
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}


export function* signUp({payload:{email,password,displayName}}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email,password);
        yield put(signUpSuccess({user, additionalData: {displayName}}))
    } catch (error) {
        yield put(signUpFailure(error))
    }
}


export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}


export function* signInAfterSignUp({payload: {user,additionalData}}) {
    yield getSnapShotUserAuth(user,additionalData)
    
}


export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}


export function* userSagas() {
    yield all([call(onGoogleSignInStart), 
        call(onEmailSignIn), 
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    
    
    
    
    
    ])
}
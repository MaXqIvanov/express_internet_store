import axios from 'axios';
import {take, takeEvery, takeLatest, takeLeading, put, call, fork, spawn, join, select} from 'redux-saga/effects'


async function swapiGet(pattern:any){
    let data:any
   await axios.get(`http://swapi.dev/api/${pattern}`).then((response:any)=>
        data = response.data.results
    )

    return data
}

export function* loadPeople(): Generator<any,void>{
    const people:any =  yield call(swapiGet, 'people');
    yield put({type: 'SET_PEOPLE', payload: people})
    return people;
}

export function* loadPlanets(): Generator<any, void>{
    const planets:any =  yield call(swapiGet, 'planets');
    yield put({type: 'SET_PLANETS', payload: planets})
}

export function* workerSaga(): Generator<any,void>{
    const task:any = yield fork(loadPeople);
    yield spawn(loadPlanets)
    
    const store = yield select((s:any)=> s)
    console.log("this is worker ", store);
    
}


export function* watchLoadData(){
    yield takeEvery('LOAD_DATA', workerSaga)
}



export default function* rootSaga(){
    yield fork(watchLoadData);
}
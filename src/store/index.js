import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import api from '../api'

import { rootReducer } from './reducers'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(api.middleware),
})

export const useAppDispatch = () => useDispatch()

export default store


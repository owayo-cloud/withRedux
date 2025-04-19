import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Movie {
    id: string
    title: string
    description: string
    posterUrl: string
}

interface MoviesState {
    movies: Movie[]
    loading: boolean
    error: string | null
}

// Initial state
const initialState: MoviesState = {
    movies: [],
    loading: false,
    error: null,
}

// Thunk to fetch movies from backend API
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, thunkAPI) => {
    try{
        const response = await axios.get('http://localhost:5173/api/movies')
        console.log('✅ Response from API:', response.data)
        return response.data.movies
        //log the response data
        console.log
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.message)
    }
}
)

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMovies.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false
                state.movies = action.payload
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})
export default moviesSlice.reducer
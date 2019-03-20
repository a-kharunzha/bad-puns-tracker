import {Injectable} from '@angular/core';
// import { Http, Headers, RequestOptions } from '@angular/common/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Movie {
    id: number;
    title: string;
    count: number;
    isUpdating: boolean;
}

const API_URL = 'http://localhost:8000';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    constructor(private http: HttpClient) {
    }

    getMovies(): Observable<Movie[]> {
        // return this.http.get<Movie[]>(API_URL + '/movies');
        return this.http.get<Movie[]>(API_URL + '/movies').pipe(
            map(res => {
                console.log(res);
                let modifiedResult = res; // .json();
                modifiedResult = modifiedResult.map(movie => {
                    movie.isUpdating = false;
                    return movie;
                });
                return modifiedResult;
            })
        );
    }

    increaseCount(id): Observable<any> {
        return this.http.post(API_URL + '/movies/' + id + '/count', {});
    }

    addMovie(movie): Observable<any> {
        return this.http.post(API_URL + '/movies', movie);
    }
}

import {Component, OnInit} from '@angular/core';
import {Movie, MovieService} from '../movie.service';
import 'rxjs';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

    isLoading = true;
    movies: Movie[];
    errorMessage: string;

    constructor(private movieService: MovieService) {
    }

    ngOnInit() {
        this.getMovies();
    }

    private getMovies() {
        this.movieService
            .getMovies()
            .subscribe(
                movies => {
                    this.movies = movies;
                    this.isLoading = false;
                },
                error => this.errorMessage = error as any
            );
    }

    findMovie(id): Movie {
        return this.movies.find(movie => movie.id === id);
    }

    isUpdating(id): boolean {
        return this.findMovie(id).isUpdating;
    }

    increaseCount(id) {
        const movie = this.findMovie(id);
        movie.isUpdating = true;
        this.movieService
            .increaseCount(id)
            .subscribe(
                response => {
                    movie.count = response.count;
                    movie.isUpdating = false;
                },
                error => {
                    this.errorMessage = error as any;
                    movie.isUpdating = false;
                }
            );
    }

    appendMovie(movie: Movie) {
        this.movies.push(movie);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero, HeroGetResponse } from './hero';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {

  // URL base da API, todas as requisicoes irao ser para endpoints dela
  private heroesUrl = 'https://api-default-309921.rj.r.appspot.com';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroes(cursor?: string): Observable<HeroGetResponse> {
    return this.http.get<HeroGetResponse>(`${this.heroesUrl}/heroes?cursor=${cursor || ''}`)
      .pipe(
        tap(_ => this.log('fectched heroes')),
        catchError(this.handleError<HeroGetResponse>('getHeroes', { heroes: [], cursor: undefined }))
      );
  }

  /** GET heroes from the server */
  getTopHeroes(cursor?: string): Observable<HeroGetResponse> {
    return this.http.get<HeroGetResponse>(`${this.heroesUrl}/top-heroes`)
      .pipe(
        tap(_ => this.log('fetched top heroes')),
        catchError(this.handleError<HeroGetResponse>('getTopHeroes', { heroes: [], cursor: undefined }))
      );
  }





  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: string): Observable<Hero> {
    const url = `${this.heroesUrl} / hero /? id = ${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id = ${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id = ${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl} / hero / ${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl} /? name = ${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    // Seguindo a documentacao o heroi precisa ser enviado dentro de um objeto
    // com a chave "hero"
    const heroParams = { hero: hero };
    return this.http.post<Hero>(`${this.heroesUrl} / heroes`, heroParams, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w / id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl} / hero / ${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id = ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** POST: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    const heroParams = { hero: hero };
    return this.http.post(`${this.heroesUrl} / hero / ${hero.id}`, heroParams, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id = ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
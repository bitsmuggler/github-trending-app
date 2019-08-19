import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private httpClient: HttpClient) { }


  getTrendingRepos(filter: Filter): Observable<TrendingRepo[]> {
    return this.httpClient.get(`https://github-trending-api.now.sh?language=${filter.language}&since=${filter.since}`).pipe(map((n: any) => n as TrendingRepo[]));
  }
}

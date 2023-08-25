import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Snes } from '@shared/model/snes';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root',
})
export class SnesService extends AbstractService {
  constructor(private http: HttpClient) {
    super();
  }

  getAll() {
    return this.http.get<Snes[]>(`${environment.api}/v1/snes`);
  }

  add(game: Snes) {
    return this.http.post(`${environment.api}/v1/snes`, game);
  }

  edit(game: Snes) {
    return this.http.put(`${environment.api}/v1/snes/${game.id}`, game);
  }

  delete(id: string) {
    return this.http.delete(`${environment.api}/v1/snes/${id}`);
  }
}

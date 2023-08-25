import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Genesis } from '@shared/model/genesis';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root',
})
export class GenesisService extends AbstractService {
  constructor(private http: HttpClient) {
    super();
  }

  getAll() {
    return this.http.get<Genesis[]>(`${environment.api}/v1/genesis`);
  }

  add(game: Genesis) {
    return this.http.post(`${environment.api}/v1/genesis`, game);
  }

  edit(game: Genesis) {
    return this.http.patch(`${environment.api}/v1/genesis/${game.id}`, game);
  }

  delete(id: string) {
    return this.http.delete(`${environment.api}/v1/genesis/${id}`);
  }
}

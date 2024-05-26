import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy, inject } from '@angular/core';
import { LS_DATA_KEY, TASK1 } from '../enviroments';
import {
  IClient,
  IClientForm,
  IClientResponse,
  IClients,
} from '../models/interfaces';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsDataService implements OnDestroy {
  public clients$ = new BehaviorSubject<IClients>([]);

  private _http = inject(HttpClient);

  constructor(
    private localStorageService: LocalStorageService,
    @Inject(LS_DATA_KEY) private lsKey: string
  ) {}

  ngOnDestroy(): void {
    console.log('ddd');
  }

  /**
   * добавление нового клиента в список
   * @param client
   */
  public getClients() {
    try {
      const _ls_cache = this.localStorageService.getItem(this.lsKey);
      if (_ls_cache) {
        this.clients$.next(_ls_cache as IClients);
      } else {
        this._http
          .get<IClientResponse>(TASK1)
          .pipe(map((el) => el.users.map((v) => ({ ...v, id: UUID.UUID() }))))
          .subscribe((value) => this.clients$.next(value));
      }
    } catch {
      this.clients$.next([]);
      throw new Error('Ошибка получения данных');
    }
  }

  public addClient(client: IClientForm): void {
    const _clients = this.clients$.value;
    _clients.push({ id: UUID.UUID(), ...client });
    this.clients$.next(_clients);
    this.localStorageService.setItem(this.lsKey, _clients);
  }

  /**
   * редактирование элементов в списке клиентов (поиск по id)
   * @param client
   */
  public editClient(client: IClient): void {
    const _clients = this.clients$.value;
    const _index = _clients.findIndex((c) => c.id === client.id);
    _clients.splice(_index, 1, client);
    this.clients$.next(_clients);
    this.localStorageService.setItem(this.lsKey, _clients);
  }
  /**
   * удаление клиентов из списка клиентов
   * @param clients
   */
  public deleteClients(clients: IClient[]): void {
    const _clients = this.clients$.value;
    const _filteredClients = _clients.filter(
      (client) => !clients.includes(client)
    );
    this.clients$.next(_filteredClients);
    this.localStorageService.setItem(this.lsKey, _filteredClients);
  }
}

export const LOCAL_STORAGE_CACHE = 'INITIUM_CACHE';

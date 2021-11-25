import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/environments/environment';
import { IDeputado } from '../Interfaces/IDeputados';

@Injectable({
  providedIn: 'root',
})
export class DeputadoService {
  constructor(private httpClient: HttpClient) {}

  public obterDeputados(): Observable<any> {
    return this.httpClient.get<any>(`${API_PATH}/deputados`);
  }

  public obterProjetos(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `${API_PATH}/proposicoes?idDeputadoAutor=${id}`
    );
  }

  public obterProjeto(id: number): Observable<any> {
    return this.httpClient.get<any>(`${API_PATH}/proposicoes/${id}`);
  }

  public obterAutor(id: number): Observable<any> {
    return this.httpClient.get<any>(`${API_PATH}/proposicoes/${id}/autores`);
  }

  public obterDeputadosInfo(id: number): Observable<any> {
    return this.httpClient.get<any>(`${API_PATH}/deputados/${id}`);
  }

  public obterEventos(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `${API_PATH}/deputados/${id}/eventos?ordenarPor=dataHoraFim`
    );
  }

  public obterDespesas(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `${API_PATH}/deputados/${id}/despesas?ordenarPor=dataDocumento&ordem=desc`
    );
  }
  public obterDespesasMaior(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `${API_PATH}/deputados/${id}/despesas?ordenarPor=valorDocumento&ordem=desc`
    );
  }

  public obterMasculino(): Observable<any> {
    return this.httpClient.get<any>(`${API_PATH}/deputados?siglaSexo=M`);
  }

  public obterFeminino(): Observable<any> {
    return this.httpClient.get<any>(`${API_PATH}/deputados?siglaSexo=F`);
  }
}

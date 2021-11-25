import { Pipe, PipeTransform } from '@angular/core';
import { IDeputado } from '../Interfaces/IDeputados';

@Pipe({
  name: 'arrayFiltro',
})
export class ArrayFiltroPipe implements PipeTransform {
  transform(value: IDeputado[], filtro: string): any {
    if (filtro) {
      filtro = filtro.toLowerCase();

      return value.filter((a) => a.nome.toLowerCase().indexOf(filtro) >= 0);
    } else {
      // Quando filtro for vazio ou nulo,
      // retornamos o próprio array
      return value;
    }
  }
}

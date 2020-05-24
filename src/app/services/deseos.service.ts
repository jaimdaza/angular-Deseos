import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {
    // const lista1 = new Lista('jugar');
    // const lista2 = new Lista('compras');
   // this.listas.push(lista1, lista2);
    this.cargarStorage();
   }


crearLista(tiluto: string){
 const nuevaLista = new Lista(tiluto);
 this.listas.push(nuevaLista);
 this.guardarStorage();
 return nuevaLista.id;
}

guardarStorage(){
  localStorage.setItem('data', JSON.stringify(this.listas));
}

cargarStorage(){
  if (localStorage.getItem('data')){
        this.listas = JSON.parse(localStorage.getItem('data'));
  }
}

obtenerLista(id: string | number){
  id = Number(id);
  return this.listas.find(listaData => {
  return listaData.id === id;
  });
}

borrarLista(lista: Lista){
this.listas = this.listas.filter(listaData => listaData.id !== lista.id);
this.guardarStorage();
}

}

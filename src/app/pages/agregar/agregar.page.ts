import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem: string;

  constructor(private deseosService: DeseosService,
              private router: ActivatedRoute) {
    const listaId = this.router.snapshot.paramMap.get('listaId');
    this.lista = this.deseosService.obtenerLista(listaId);
  }

  ngOnInit() {
  }

  agregaritem(){
  if (this.nombreItem.length === 0){
    return;
    }
  const nuevoItem = new ListaItem(this.nombreItem);
  this.lista.items.push(nuevoItem);
  this.nombreItem = '';
  this.deseosService.guardarStorage();
  }

  cambioCheck(item: ListaItem){
    const pendientes = this.lista.items.filter(itemData => {
      return !itemData.completado;
    }).length;
    if (pendientes === 0){
      this.lista.fechaTerminada = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.fechaTerminada = null;
      this.lista.terminada = false;
    }
    this.deseosService.guardarStorage();
  }

  borrar(i: number){
    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }

}

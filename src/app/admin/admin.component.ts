import { Link } from './../shared/classes/link';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  links: Link[] = [
    { route: 'usuarios', label: 'Usuarios', icon: ''},
    { route: 'lugares-de-trabajo', label: 'Lugares de trabajo', icon: ''},
    { route: 'productos', label: 'Productos', icon: ''},
    { route: 'categorias', label: 'Categorias', icon: ''},
    { route: 'menus', label: 'Menus', icon: ''},
    
  ]
  constructor() { }

  ngOnInit() {
  }

}

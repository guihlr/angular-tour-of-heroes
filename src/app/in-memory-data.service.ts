import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero, HeroUniverse } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes =[
      { id: 11, name: 'Iron Man', description: 'He is the Armored Avenger', universe: HeroUniverse.MARVEL, imageUrl: 'https://wc.wallpaperuse.com/wallp/3-33095_s.jpg' },
      { id: 12, name: 'Superman', description: 'The last son of Krypton', universe: HeroUniverse.DC, imageUrl: 'https://image.winudf.com/v2/image/Y29tLmRlc2l3YWxscGFwZXJzLmRTdXBlck1hbl9zY3JlZW5fNl8xNTM2MjEwMjc4XzA4OQ/screen-6.jpg?h=355&fakeurl=1&type=.jpg'},
      { id: 13, name: 'Batman', description: 'The Batman!!', universe: HeroUniverse.DC, imageUrl: 'https://www.revistabula.com/wp/wp-content/uploads/2019/10/Batman-610x350.jpg' },
      { id: 14, name: 'Super girl', description: "Superman's cousin ", universe: HeroUniverse.DC, imageUrl: 'https://mixdeseries.com.br/wp-content/uploads/2020/10/Supergirl-6-temporada.jpg'},
      { id: 15, name: 'Capitan America', description: 'Avengers leader', universe: HeroUniverse.MARVEL, imageUrl: 'https://www.lacasadeel.net/wp-content/uploads/2021/01/retorno-de-captain-america-al-mcu.jpg'},
      { id: 16, name: 'Hulk', description: 'Hulk', universe: HeroUniverse.MARVEL, imageUrl: 'https://kanto.legiaodosherois.com.br/w760-h398-gnw-cfill-q80/wp-content/uploads/2020/06/legiao_EKohXa0I3ZHj.jpg.jpeg'},
      { id: 17, name: 'Thor', description: "Odin's son", universe: HeroUniverse.MARVEL, imageUrl: 'https://kanto.legiaodosherois.com.br/w760-h398-gnw-cfill-q80/wp-content/uploads/2021/02/legiao_omstpaMK14_3.jpg.jpeg'},
      { id: 18, name: 'Wonder Woman', description: 'Amazona', universe: HeroUniverse.DC, imageUrl: 'https://jpimg.com.br/uploads/2019/10/gal-gadot-mulher-maravilha-1984.jpg'},
      { id: 19, name: 'Flash', description: 'Very fast', universe: HeroUniverse.DC, imageUrl: 'https://s.aficionados.com.br/imagens/the-flash-cri-tica-0.jpg'},
      { id: 20, name: 'Wolverine', description: 'Wolverine', universe: HeroUniverse.MARVEL, imageUrl: 'https://kanto.legiaodosherois.com.br/w760-h398-gnw-cfill-q80/wp-content/uploads/2019/12/legiao_U3JF8QT5NDLzm0geaCE6AhpRWGvXOPqulc_bY2HrwZ.png.jpeg'}
    ];
    return { heroes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
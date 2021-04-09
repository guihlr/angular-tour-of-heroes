import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { max, min } from 'rxjs/operators';
import { Hero, HeroUniverse } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  // O input hero ira receber o heroi para criação ou atualização, de acordo com a tela e a presença
  // do atributo id
  @Input() hero: Hero;

  // Output heroSaved ira ser emitido depois que o heroi for atualizado ou criado
  @Output() heroSaved: EventEmitter<void> = new EventEmitter<void>();

  // Output goBack ira ser emitido se o usuario decidir voltar para a pagina anterior
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  heroUniverses: Array<HeroUniverse> = [HeroUniverse.DC, HeroUniverse.MARVEL];

  constructor(private heroService: HeroService,
    private formBuilder: FormBuilder
  ) { }

  formulario: FormGroup;

  onGoBack(): void {
    this.goBack.emit();
  }

  save(): void {
    let hero: Hero = this.formulario.value
    if (hero.id) {
      this.heroService.updateHero(hero)
        .subscribe(() => this.heroSaved.emit())
    }
    else {
      this.heroService.addHero(hero)
        .subscribe(() => this.heroSaved.emit())
    }
  }

  ngOnInit() {

    // this.formGroup = new FormGroup({
    //   name: new FormControl('{{hero.name}}'),
    //   description: new FormControl('{{hero.description}}')
    // });

    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.formulario = this.formBuilder.group({
      name: [this.hero.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      id: [this.hero.id],
      description: [this.hero.description, [Validators.required, Validators.minLength(3)]],
      imageUrl: [this.hero.imageUrl, [Validators.required, Validators.pattern(reg)]],
      universe: [this.hero.universe]
    })

  }
}

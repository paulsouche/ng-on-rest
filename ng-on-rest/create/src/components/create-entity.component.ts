import { Location } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGOR_DEBUG } from 'ng-on-rest-core';
import { INgorCreateLabels } from '../interfaces/create-labels';
import { INgorCreateSuccess } from '../interfaces/create-sucess';
import { INgorSubEntitiesMap } from '../interfaces/sub-entities-map';
import { NgorCreateStepService } from '../services/create-step.service';
import { NgorCreateEntityStepComponent } from './create-entity-step.component';

@Component({
  providers: [NgorCreateStepService],
  selector: 'ngor-create-entity',
  template: `
    <nav class="breadcrumb mt-3" [attr.hidden]="(steps.length < 2) || null">
      <h3 class="w-100" [innerHTML]="labels.title | translate"></h3>
      <ng-container *ngFor="let step of steps;let i=index">
        <ng-container *ngIf="debug ? isActive(step) : !isActive(step)">
          <span class="breadcrumb-item active" [innerHTML]="step.labels.title | translate"></span>
        </ng-container>
        <ng-container *ngIf="debug ? !isActive(step) : isActive(step)">
          <a class="breadcrumb-item"
             [routerLink]="" [queryParams]="debug ? { step: i } : {}"
             [innerHTML]="step.labels.title | translate"
             (click)="setActive(step)">
          </a>
        </ng-container>
      </ng-container>
    </nav>
    <div *ngFor="let step of steps" [attr.hidden]="(step !== activeStep) || null">
      <ng-container *ngTemplateOutlet="step.template">
      </ng-container>
    </div>
  `,
})
export class NgorCreateEntityComponent<
  FormMdl, Qry, Prms, ECrteDto, EUpdteDto, EDto extends { id: any }, CFormMdl, CCrteDto, CDto>
  implements AfterContentInit, OnInit {
  @ContentChildren(NgorCreateEntityStepComponent)
  public steps: QueryList<NgorCreateEntityStepComponent<FormMdl>>;

  // TODO i18n module
  @Input()
  public labels: INgorCreateLabels = {};

  @Input()
  public subEntitiesMap: Array<INgorSubEntitiesMap<EDto, CCrteDto>> | undefined;

  @Output()
  public onCreate = new EventEmitter<INgorCreateSuccess<EDto, CDto>>(true);

  @Output()
  public onError = new EventEmitter<Error>(true);

  public debug: boolean;
  public activeStep: NgorCreateEntityStepComponent<FormMdl>;
  public activeStepIndex: number;
  public templateContext: { back(): void, submit(): void };

  private _location: Location;
  private _router: Router;
  private _route: ActivatedRoute;
  private _createStepService: NgorCreateStepService<
    FormMdl, Qry, Prms, ECrteDto, EUpdteDto, EDto, CFormMdl, CCrteDto, CDto>;
  constructor(
    location: Location,
    router: Router,
    route: ActivatedRoute,
    createStepService: NgorCreateStepService<
      FormMdl, Qry, Prms, ECrteDto, EUpdteDto, EDto, CFormMdl, CCrteDto, CDto>,
    @Inject(NGOR_DEBUG) debug: boolean) {
    this._location = location;
    this._router = router;
    this._route = route;
    this._createStepService = createStepService;
    this.debug = debug;
  }

  public ngOnInit() {
    this._createStepService.setSubEntitiesMap(this.subEntitiesMap);
  }

  public ngAfterContentInit() {
    const stepParam = 'step';
    this.steps.forEach((step) => {
      step.onBack.subscribe(() => this._stepBack());
      step.onSubmit.subscribe(($event: FormMdl) => this._stepForward($event));
    });
    this._route.queryParams
      .subscribe((params) => {
        const steps = this.steps;
        const step = params[stepParam];
        const activeStep = steps.find((_, i) => i.toString() === step);
        this.setActive(activeStep || steps.first);
      });
  }

  public isActive(step: NgorCreateEntityStepComponent<FormMdl>) {
    return this.activeStep === step;
  }

  public setActive(step: NgorCreateEntityStepComponent<FormMdl>) {
    this.activeStep = step;
    step.enter(this._createStepService.getFormValue());
  }

  public back() {
    this._location.back();
  }

  private _goToStep(inc: number) {
    const stepsArray = this.steps.toArray();
    const nextStepIndex = stepsArray.indexOf(this.activeStep) + inc;
    if (this.debug) {
      this._router.navigate([], {
        queryParams: { step: nextStepIndex },
      });
    } else {
      this.setActive(stepsArray[nextStepIndex]);
    }
  }

  private _stepBack() {
    if (this.activeStep === this.steps.first) {
      return this.back();
    }
    return this._goToStep(-1);
  }

  private _stepForward(formValue: FormMdl) {
    this._createStepService.updateValue(formValue)
      .then((entityCreateDto) => {
        if (this.activeStep !== this.steps.last) {
          return this._goToStep(+1);
        }
        return this._createStepService.createEntity(entityCreateDto)
          .then((res) => this.onCreate.emit({
            ...res,
            router: this._router,
          }));
      })
      .catch((err: Error) => this.onError.emit(err));
  }
}

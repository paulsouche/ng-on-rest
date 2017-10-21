// tslint:disable:max-classes-per-file
import { Component, forwardRef, OnInit, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// tslint:disable-next-line:no-implicit-dependencies
import { By } from '@angular/platform-browser';
import { DynamicFormControlEvent } from '@ng-dynamic-forms/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgorDynamicFormComponent, NgorFormsModule, TNgorFormModel } from '../';
import { NgorCustomFormGroupComponent } from './custom-form-group.component';

@Component({
  selector: 'test-ngor-dynamic-form',
  template: `
    <ngor-dynamic-form [model]="model"
                       [labels]="labels"
                       [layout]="layout"
                       [formId]="formId"
                       (onBack)="back()"
                       (onChecked)="checked($event)"
                       (onSubmit)="submit($event)"
                       (onControlBlured)="blured($event)"
                       (onControlChanged)="changed($event)"
                       (onControlFocused)="focused($event)">
      <test-ngor-custom-form-group></test-ngor-custom-form-group>
    </ngor-dynamic-form>
  `,
})
class TestNgorDynamicFormComponent {
  public labels = {};
  public layout = {};
  public formId = '';
  public model: TNgorFormModel = [
    {
      id: 'sampleInput',
      label: 'Sample Input',
      maxLength: 42,
      placeholder: 'Sample input',
      type: 'INPUT',
    },
    {
      id: 'sampleRadioGroup',
      label: 'Sample Radio Group',
      options: [
        {
          label: 'Option 1',
          value: 'option-1',
        },
        {
          label: 'Option 2',
          value: 'option-2',
        },
        {
          label: 'Option 3',
          value: 'option-3',
        },
      ],
      type: 'RADIO_GROUP',
      value: 'option-3',
    },
    {
      id: 'sampleCheckbox',
      label: 'I do agree',
      type: 'CHECKBOX',
    },
  ];
  public back = jasmine.createSpy('spyBack');
  public checked = jasmine.createSpy('spyChecked');
  public submit = jasmine.createSpy('spySubmit');
  public blured = jasmine.createSpy('spyBlured');
  public changed = jasmine.createSpy('spyChanged');
  public focused = jasmine.createSpy('spyFocused');
}

@Component({
  providers: [{
    provide: NgorCustomFormGroupComponent,
    useExisting: forwardRef(() => TestNgorCustomFormGroupComponent),
  }],
  selector: 'test-ngor-custom-form-group',
  template: `
    <div class="form-group">
      <label class="form-control-label" for="customInput">customInput</label>
      <input type="text" class="form-control" id="customInput" formControlName="customInput">
    </div>
  `,
})
class TestNgorCustomFormGroupComponent extends NgorCustomFormGroupComponent implements OnInit {
  public formGroup: FormGroup;
  protected _formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  public ngOnInit() {
    this.formGroup.addControl('customInput', this._formBuilder.control(''));
  }
}

describe('NgorDynamicFormComponent', () => {
  let fixture: ComponentFixture<TestNgorDynamicFormComponent>;
  beforeEach(async(() => {
    fixture = TestBed
      .configureTestingModule({
        declarations: [
          TestNgorDynamicFormComponent,
          TestNgorCustomFormGroupComponent,
        ],
        imports: [
          TranslateModule.forRoot(),
          NgorFormsModule.forRoot(),
        ],
      })
      .createComponent(TestNgorDynamicFormComponent);

    fixture.detectChanges();
  }));

  it('Should callBack with dynamic model when view checked', () => {
    expect(fixture.componentInstance.checked).toHaveBeenCalledWith(jasmine.any(Array));
  });

  it('Should wrap custom form groups components', () => {
    expect(fixture.debugElement.query(By.directive(NgorCustomFormGroupComponent as Type<any>))).not.toBeNull();
  });

  describe('When user cancels', () => {
    beforeEach(async(() => {
      const form: NgorDynamicFormComponent<any> = fixture.debugElement
        .query(By.directive(NgorDynamicFormComponent)).componentInstance;
      form.back();
    }));

    it('Should prevent parent', () => {
      expect(fixture.componentInstance.back).toHaveBeenCalled();
    });
  });

  describe('When user submits', () => {
    beforeEach(async(() => {
      const form: NgorDynamicFormComponent<any> = fixture.debugElement
        .query(By.directive(NgorDynamicFormComponent)).componentInstance;
      form.submit();
    }));

    it('Should prevent parent', () => {
      expect(fixture.componentInstance.submit).toHaveBeenCalledWith({
        sampleCheckbox: false,
        sampleInput: null,
        sampleRadioGroup: 'option-3',
      });
    });
  });

  describe('When user blurs control', () => {
    let event: DynamicFormControlEvent;

    beforeEach(async(() => {
      const form: NgorDynamicFormComponent<any> = fixture.debugElement
        .query(By.directive(NgorDynamicFormComponent)).componentInstance;

      event = {
        $event: new Event('blur'),
        context: null,
        control: form.formGroup.controls.sampleInput as FormControl,
        group: form.formGroup,
        model: form.formModel[0],
        type: 'INPUT',
      };

      form.blured(event);
    }));

    it('Should prevent parent', () => {
      expect(fixture.componentInstance.blured).toHaveBeenCalledWith(event);
    });
  });

  describe('When user changes control', () => {
    let event: DynamicFormControlEvent;

    beforeEach(async(() => {
      const form: NgorDynamicFormComponent<any> = fixture.debugElement
        .query(By.directive(NgorDynamicFormComponent)).componentInstance;

      event = {
        $event: new Event('change'),
        context: null,
        control: form.formGroup.controls.sampleInput as FormControl,
        group: form.formGroup,
        model: form.formModel[0],
        type: 'INPUT',
      };

      form.changed(event);
    }));

    it('Should prevent parent', () => {
      expect(fixture.componentInstance.changed).toHaveBeenCalledWith(event);
    });
  });

  describe('When user focuses control', () => {
    let event: DynamicFormControlEvent;

    beforeEach(async(() => {
      const form: NgorDynamicFormComponent<any> = fixture.debugElement
        .query(By.directive(NgorDynamicFormComponent)).componentInstance;

      event = {
        $event: new Event('focus'),
        context: null,
        control: form.formGroup.controls.sampleInput as FormControl,
        group: form.formGroup,
        model: form.formModel[0],
        type: 'INPUT',
      };

      form.focused(event);
    }));

    it('Should prevent parent', () => {
      expect(fixture.componentInstance.focused).toHaveBeenCalledWith(event);
    });
  });

  describe('When user has previous model', () => {
    beforeEach(async(() => {
      const form: NgorDynamicFormComponent<any> = fixture.debugElement
        .query(By.directive(NgorDynamicFormComponent)).componentInstance;
      form.setValues({
        sampleCheckbox: true,
        sampleInput: 'foo',
        sampleRadioGroup: 'option-1',
      });
      form.submit();
    }));

    it('Should update formGroup', () => {
      expect(fixture.componentInstance.submit).toHaveBeenCalledWith({
        sampleCheckbox: true,
        sampleInput: 'foo',
        sampleRadioGroup: 'option-1',
      });
    });
  });
});

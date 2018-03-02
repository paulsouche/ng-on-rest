import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgorCoreModule, NgorResourceComponentsService } from 'ng-on-rest-core';
import { spyNgorResourceComponentsService } from 'ng-on-rest-core/testing';
import { TNgorFormModel } from 'ng-on-rest-forms';
import { NgorI18nModule } from 'ng-on-rest-i18n';
import { NgorCreateModule } from '../';

@Component({
  selector: 'test-ngor-create-entity',
  template: `
    <ngor-create-entity>
      <ngor-create-entity-step [model]="model">
      </ngor-create-entity-step>
    </ngor-create-entity>
  `,
})
class TestNgorCreateEntityComponent {
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
}

describe('NgorCreateEntityComponent', () => {
  let fixture: ComponentFixture<TestNgorCreateEntityComponent>;

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestNgorCreateEntityComponent,
      ],
      imports: [
        TranslateModule.forRoot(),
        NgorI18nModule.forRoot(),
        RouterModule.forRoot([], { useHash: true }),
        NgorCoreModule.forRoot({
          resources: [],
        }),
        NgorCreateModule.forRoot(),
      ],
      providers: [
        { provide: NgorResourceComponentsService, useValue: spyNgorResourceComponentsService },
      ],
    })
      .createComponent(TestNgorCreateEntityComponent);
    fixture.detectChanges();
  }));

  it('Should be defined', () => {
    expect(fixture).toBeDefined();
  });
});

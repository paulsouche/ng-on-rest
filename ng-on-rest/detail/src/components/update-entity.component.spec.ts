import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgorCoreModule, NgorResourceComponentsService } from 'ng-on-rest-core';
import { spyNgorResourceComponentsService } from 'ng-on-rest-core/testing';
import { TNgorFormModel } from 'ng-on-rest-forms';
import { NgorDetailModule } from '../';

@Component({
  selector: 'test-ngor-update-entity',
  template: `
    <ngor-update-entity></ngor-update-entity>
  `,
})
class TestNgorUpdateEntityComponent {
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
  let fixture: ComponentFixture<TestNgorUpdateEntityComponent>;

  beforeEach(async(() => {
    Object.defineProperty(spyNgorResourceComponentsService, 'resource', {
      configurable: false,
      enumerable: true,
      get: () => ({}),
    });
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestNgorUpdateEntityComponent,
      ],
      imports: [
        TranslateModule.forRoot(),
        NgorCoreModule.forRoot({
          resources: [],
        }),
        NgorDetailModule.forRoot(),
      ],
      providers: [
        { provide: NgorResourceComponentsService, useValue: spyNgorResourceComponentsService },
      ],
    })
      .createComponent(TestNgorUpdateEntityComponent);
    fixture.detectChanges();
  }));

  it('Should be defined', () => {
    expect(fixture).toBeDefined();
  });
});

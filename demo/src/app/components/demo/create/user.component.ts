import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { INgorCreateLabels, INgorCreateStepLabels } from 'ng-on-rest-create';
import { TNgorFormModel } from 'ng-on-rest-forms';
import { UserClient, UserCreateComponent, UserResource } from '../../../interfaces/components/users';

@Component({
  selector: 'demo-create-user',
  template: `
    <div class="row justify-content-center">
      <div class="col-6">
        <ngor-create-entity [labels]="labels" (onCreate)="goBack()">
          <ngor-create-entity-step [labels]="userStepLabels" [model]="userModel">
          </ngor-create-entity-step>
          <ngor-create-entity-step [labels]="addressStepLabels" [model]="addressModel">
          </ngor-create-entity-step>
        </ngor-create-entity>
      </div>
    </div>
  `,
})
export class DemoCreateUserComponent implements UserCreateComponent {
  public resource: UserResource;
  public client: UserClient;
  public step: string;

  public labels: INgorCreateLabels = {
    title: 'users.createTitle',
  };

  public userStepLabels: INgorCreateStepLabels = {
    cancel: 'users.cancel',
    submit: 'users.next',
    title: 'users.details',
  };

  public addressStepLabels: INgorCreateStepLabels = {
    cancel: 'users.previous',
    subTitle: 'users.addressDetail',
    submit: 'users.create',
    title: 'users.address',
  };

  public userModel: TNgorFormModel = [
    {
      id: 'name',
      label: 'demo.forms.users.name',
      required: true,
      type: 'INPUT',
    },
    {
      id: 'username',
      label: 'demo.forms.users.username',
      required: true,
      type: 'INPUT',
    },
    {
      id: 'email',
      label: 'demo.forms.users.email',
      type: 'INPUT',
    },
    {
      id: 'phone',
      label: 'demo.forms.users.phone',
      type: 'INPUT',
    },
    {
      id: 'website',
      label: 'demo.forms.users.website',
      type: 'INPUT',
    },
  ];

  public addressModel: TNgorFormModel = [
    {
      group: [
        {
          id: 'street',
          label: 'demo.forms.users.address.street',
          required: true,
          type: 'INPUT',
        },
        {
          id: 'suite',
          label: 'demo.forms.users.address.suite',
          required: true,
          type: 'INPUT',
        },
        {
          id: 'city',
          label: 'demo.forms.users.address.city',
          required: true,
          type: 'INPUT',
        },
        {
          id: 'zipcode',
          label: 'demo.forms.users.address.zipcode',
          required: true,
          type: 'INPUT',
        },
      ],
      id: 'address',
      type: 'GROUP',
    },
  ];

  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  public goBack() {
    this._router.navigate(['create/users']);
  }
}

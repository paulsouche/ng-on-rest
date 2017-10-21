import { Component } from '@angular/core';
import { INgorEntityDetailColumn, INgorUpdateEntityLabels } from 'ng-on-rest-detail';
import { TNgorFormModel } from 'ng-on-rest-forms';
import { UserClient, UserDetailComponent, UserResource } from '../../../interfaces/components/users';
import { IUserDto } from '../../../interfaces/dtos/users';

@Component({
  selector: 'demo-detail-user',
  styles: [`
    /deep/ label {
      font-weight: bold;
    }

    /deep/ label + div {
      margin-bottom: 1em;
    }

    img {
      max-width: 150px;
      max-height: 150px;
    }
  `],
  template: `
    <ngor-update-entity [columns]="columns" [labels]="labels" [model]="userModel">
      <img src="/assets/img/user.png" alt="USER">
    </ngor-update-entity>
  `,
})
export class DemoDetailUserComponent implements UserDetailComponent {
  public resource: UserResource;
  public client: UserClient;
  public entity: IUserDto;
  public step: string;

  public labels: INgorUpdateEntityLabels = {
    cancel: 'users.cancel',
    save: 'users.save',
    title: 'users.detailTitle',
    update: 'users.update',
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

  public columns: Array<INgorEntityDetailColumn<IUserDto>> = [
    {
      cells: [
        {
          class: 'col-12',
          label: 'Id',
          property: 'id',
        },
        {
          class: 'col-12',
          label: 'demo.forms.users.name',
          property: 'name',
        },
        {
          class: 'col-12',
          label: 'demo.forms.users.username',
          property: 'username',
        },
      ],
      class: 'col-6',
    },
    {
      cells: [
        {
          class: 'col-12',
          label: 'demo.forms.users.email',
          property: 'email',
        },
        {
          class: 'col-12',
          label: 'demo.forms.users.phone',
          property: 'phone',
        },
        {
          class: 'col-12',
          label: 'demo.forms.users.website',
          property: 'website',
        },
      ],
      class: 'col-6',
    },
  ];
}

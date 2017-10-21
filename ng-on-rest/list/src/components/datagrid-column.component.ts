import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'ngor-datagrid-column',
  template: ``,
})
export class NgorDatagridColumnComponent {
  @ContentChild(TemplateRef)
  public template: TemplateRef<any>;

  @Input()
  public property: string;

  @Input()
  public title: string;

  @Input()
  public sortable: boolean;
}

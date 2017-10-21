Ce formulaire a été créé avec **ng-on-rest-core**. Voici son composant.

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostClient, PostDeleteComponent, PostResource } from '../../../interfaces/components/posts';
import { IPostDto } from '../../../interfaces/dtos/posts';

@Component({
  selector: 'delete-post',
  template: `
    <h4>Supprimer le post {{entity.title}} ?</h4>
    <form class="mt-5" (submit)="submit()">
      <div class="for-group text-right">
        <a class="btn btn-secondary mr-4" routerLink="/core/posts">
          Annuler
        </a>
        <button type="submit" class="btn btn-primary">
          Supprimer
        </button>
      </div>
    </form>
  `,
})
export class DeletePostComponent implements PostDeleteComponent {
  public resource: PostResource;
  public client: PostClient;
  public entity: IPostDto;
  public step: string;

  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  public submit() {
    return this.client.delete(this.entity)
      .then(() => this._router.navigate(['core/posts']));
  }
}
```

Rien de bien magique ici si vous avez compris la [partie configuration](#/core/posts).
import { Component } from '@angular/core';

@Component({
  selector: 'child-cell',
  template: ` <div draggable="true" (dragstart)="onDragStart($event)">
    {{fieldName}}
  </div>`,
})
export class DragSourceRenderer {
  public params: any;
  public fieldName: string

  agInit(params: any): void {
    this.params = params;
    this.fieldName = Object.values(params.data)[0] as any;
  }

  onDragStart(dragEvent: DragEvent) {
    var userAgent = window.navigator.userAgent;
    var isIE = userAgent.indexOf('Trident/') >= 0;
    dragEvent.dataTransfer.setData(
      isIE ? 'text' : 'text/plain',
      'Dragged item with ID: ' + this.params.node.data.id
    );
  }
}

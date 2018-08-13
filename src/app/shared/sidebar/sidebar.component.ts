import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Output() toggleEnd = new EventEmitter<{ isSideBarOpen: boolean }>();

  isSidebarOpen = true;
  toggleAnimationMs = 600;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    // emit event when toggle animation complete
    setTimeout(() => {
      this.toggleEnd.emit({ isSideBarOpen: this.isSidebarOpen });
    }, this.toggleAnimationMs);
  }

}

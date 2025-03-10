import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {

  private readonly SELECTOR_SIDEBAR_WRAPPER = ".sidebar-wrapper";
  private readonly Default = {
    scrollbarTheme: "os-theme-light",
    scrollbarAutoHide: "leave",
    scrollbarClickScroll: true
  };

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    console.log("Sidebar Component Loaded");

    const sidebarWrapper = this.elRef.nativeElement.querySelector(this.SELECTOR_SIDEBAR_WRAPPER);
    
    if (sidebarWrapper && (window as any).OverlayScrollbarsGlobal?.OverlayScrollbars) {
      console.log("Applying OverlayScrollbars");
      (window as any).OverlayScrollbarsGlobal.OverlayScrollbars(sidebarWrapper, {
        scrollbars: {
          theme: this.Default.scrollbarTheme,
          autoHide: this.Default.scrollbarAutoHide,
          clickScroll: this.Default.scrollbarClickScroll,
        }
      });
    } else {
      console.log("OverlayScrollbars not available");
    }
  }
}

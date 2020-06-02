import { Component, Input, OnInit, HostListener, TemplateRef, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { Overlay, OverlayRef, PositionStrategy, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
    selector: 'employee',
    templateUrl: 'employee.component.html',
    styleUrls: ['employee.component.scss']
})
export class EmployeeComponent implements OnInit {
    @Input() id: number;
    @Input() field: string;
    public user: any;
    public overlayRef: OverlayRef;

    constructor(
        private sharedService: SharedService,
        private overlay: Overlay,
        private viewContainer: ViewContainerRef,
        private elementRef: ElementRef,
        private overlayPositionBuilder: OverlayPositionBuilder) { }

    @ViewChild('detail') tooltip: TemplateRef<any>;

    ngOnInit() {
        this.user = this.sharedService.getUserById(this.id);
    }

    @HostListener('mouseenter', ['$event'])
    openDetailTooltip() {
        const positionStrategy = this.getTooltipPosition();
        this.overlayRef = this.overlay.create({ positionStrategy });
        this.overlayRef.attach(new TemplatePortal(this.tooltip, this.viewContainer));
    }

    @HostListener('mouseout', ['$event'])
    closeDetailTooltip() {
        this.overlayRef.detach();
    }

    getTooltipPosition() {
        return this.overlayPositionBuilder
            .flexibleConnectedTo(this.elementRef)
            .withPositions([{
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom',
            }]);
    }
}
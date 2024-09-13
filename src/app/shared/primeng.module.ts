import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { CalendarModule } from 'primeng/calendar';
import { MatSliderModule } from '@angular/material/slider';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
//import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DragDropModule } from 'primeng/dragdrop';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
//import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

/////////////////////////////////////

// Import PrimeNG modules

import { AvatarGroupModule } from 'primeng/avatargroup';
import { ChartModule } from 'primeng/chart';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DeferModule } from 'primeng/defer';
import { EditorModule } from 'primeng/editor';
import { FocusTrapModule } from 'primeng/focustrap';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
// import { InputOtpModule } from 'primeng/inputotp';
// import { MeterGroupModule } from 'primeng/metergroup';
// import { StepperModule } from 'primeng/stepper';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { RippleModule } from 'primeng/ripple';
// import { FloatLabelModule } from 'primeng/floatlabel';
// import { IconFieldModule } from 'primeng/iconfield';
// import { InputIconModule } from 'primeng/inputicon';
import { StyleClassModule } from 'primeng/styleclass';
import { AutoFocusModule } from 'primeng/autofocus';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ exports: [
        TableModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        ConfirmDialogModule,
        RatingModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        ButtonModule,
        MenubarModule,
        ToastModule,
        ChipModule,
        CalendarModule,
        MatSliderModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        FileUploadModule,
        SliderModule,
        ProgressBarModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarModule,
        BadgeModule,
        BreadcrumbModule,
        CarouselModule,
        CascadeSelectModule,
        //ChartModule,
        CheckboxModule,
        ChipsModule,
        ColorPickerModule,
        DataViewModule,
        VirtualScrollerModule,
        DividerModule,
        DockModule,
        DragDropModule,
        DynamicDialogModule,
        //EditorModule,
        FieldsetModule,
        GalleriaModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        ImageModule,
        KnobModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MessageModule,
        MessagesModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ScrollerModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SpeedDialModule,
        SpinnerModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToggleButtonModule,
        TooltipModule,
        TriStateCheckboxModule,
        TreeModule,
        TreeSelectModule,
        TreeTableModule,
        AnimateModule,
        CardModule,
        BlockUIModule,
        ProgressSpinnerModule,
        ///////////////
        AvatarGroupModule,
        ChartModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        DeferModule,
        EditorModule,
        FocusTrapModule,
        InputGroupAddonModule,
        InputGroupModule,
        // InputOtpModule,
        // MeterGroupModule,
        // StepperModule,
        AnimateOnScrollModule,
        RippleModule,
        // FloatLabelModule,
        // IconFieldModule,
        // InputIconModule,
        StyleClassModule,
        AutoFocusModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ], imports: [TableModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        ConfirmDialogModule,
        RatingModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        ButtonModule,
        MenubarModule,
        ToastModule,
        ChipModule,
        CalendarModule,
        MatSliderModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        FileUploadModule,
        SliderModule,
        ProgressBarModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarModule,
        BadgeModule,
        BreadcrumbModule,
        CarouselModule,
        CascadeSelectModule,
        //ChartModule,
        CheckboxModule,
        ChipsModule,
        ColorPickerModule,
        DataViewModule,
        VirtualScrollerModule,
        DividerModule,
        DockModule,
        DragDropModule,
        DynamicDialogModule,
        //EditorModule,
        FieldsetModule,
        GalleriaModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        ImageModule,
        KnobModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MessageModule,
        MessagesModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ScrollerModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SpeedDialModule,
        SpinnerModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToggleButtonModule,
        TooltipModule,
        TriStateCheckboxModule,
        TreeModule,
        TreeSelectModule,
        TreeTableModule,
        AnimateModule,
        CardModule,
        BlockUIModule,
        ProgressSpinnerModule,
        ///////////////
        AvatarGroupModule,
        ChartModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        DeferModule,
        EditorModule,
        FocusTrapModule,
        InputGroupAddonModule,
        InputGroupModule,
        // InputOtpModule,
        // MeterGroupModule,
        // StepperModule,
        AnimateOnScrollModule,
        RippleModule,
        // FloatLabelModule,
        // IconFieldModule,
        // InputIconModule,
        StyleClassModule,
        AutoFocusModule,
        FormsModule,
        ReactiveFormsModule], providers: [MessageService, ConfirmationService, provideHttpClient(withInterceptorsFromDi()),] })
export class PrimeNgModule {}

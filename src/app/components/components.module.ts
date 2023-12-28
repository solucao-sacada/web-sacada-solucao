import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SliderModule } from 'primeng/slider';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { NavigationTabsBtnComponent } from './navigation-tabs-btn/navigation-tabs-btn.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ToasterService } from './toaster/toaster.service';
import { MessageService } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { MessageModule } from 'primeng/message';
import { PedidoService } from '../services/pedido.service';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import {
    ModalVideoComponent,
    SafePipe,
} from './modal-video/modal-video.component';
import { MenuModule } from 'primeng/menu';
import { MenuStepComponent } from './menu-step/menu-step.component';
import { PedidoDetailsComponent } from './pedido-details/pedido-details.component';

@NgModule({
    declarations: [
        NavigationTabsBtnComponent,
        LoadingComponent,
        ModalVideoComponent,
        SafePipe,
        MenuStepComponent,
        PedidoDetailsComponent,
    ],
    imports: [
        CommonModule,
        MenuModule,
        TabViewModule,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        CalendarModule,
        ConfirmDialogModule,
        ChipsModule,
        DropdownModule,
        InputMaskModule,
        FileUploadModule,
        InputNumberModule,
        TableModule,
        ColorPickerModule,
        CascadeSelectModule,
        MultiSelectModule,
        ToggleButtonModule,
        SliderModule,
        InputTextareaModule,
        RadioButtonModule,
        InputTextModule,
        RatingModule,
        ChipModule,
        KnobModule,
        InputSwitchModule,
        ListboxModule,
        DataViewModule,
        SelectButtonModule,
        CheckboxModule,
        CardModule,
        OverlayPanelModule,
        ButtonModule,
        ProgressSpinnerModule,
        ToastModule,
        MessageModule,
        DialogModule,
        ImageModule,
    ],
    exports: [
        DataViewModule,
        ImageModule,
        TabViewModule,
        ToastModule,
        DialogModule,
        MessageModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        OverlayPanelModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        DropdownModule,
        FileUploadModule,
        InputMaskModule,
        InputNumberModule,
        ColorPickerModule,
        CascadeSelectModule,
        TableModule,
        MultiSelectModule,
        PedidoDetailsComponent,
        ToggleButtonModule,
        SliderModule,
        InputTextareaModule,
        MenuStepComponent,
        RadioButtonModule,
        ModalVideoComponent,
        InputTextModule,
        RatingModule,
        ChipModule,
        KnobModule,
        InputSwitchModule,
        ListboxModule,
        SelectButtonModule,
        MenuModule,
        CheckboxModule,
        CardModule,
        ButtonModule,
        NavigationTabsBtnComponent,
        LoadingComponent,
    ],
    providers: [LoadingService, ToasterService, MessageService, PedidoService],
})
export class ComponentsModule {}

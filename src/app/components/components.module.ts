import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PedidoService } from '../services/pedido.service';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';
import { MenuStepComponent } from './menu-step/menu-step.component';
import {
    ModalVideoComponent,
    SafePipe,
} from './modal-video/modal-video.component';
import { NavigationTabsBtnComponent } from './navigation-tabs-btn/navigation-tabs-btn.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PedidoDetailsComponent } from './pedido-details/pedido-details.component';
import { TitleComponent } from './title/title.component';
import { ToasterService } from './toaster/toaster.service';

@NgModule({
    declarations: [
    TitleComponent,
        NavigationTabsBtnComponent,
        LoadingComponent,
        ModalVideoComponent,
        SafePipe,
        MenuStepComponent,
        PedidoDetailsComponent,
        NotfoundComponent,
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
        NotfoundComponent,
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
        TitleComponent
    ],
    providers: [LoadingService, ToasterService, MessageService, PedidoService],
})
export class ComponentsModule {}

import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, Form, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat, NgxIntlTelInputComponent } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-input-type-number',
  templateUrl: './input-type-number.component.html',
  styleUrls: ['./input-type-number.component.scss'],
  providers:[
    {
			provide: NG_VALUE_ACCESSOR,
			// tslint:disable-next-line:no-forward-ref
			useExisting: forwardRef(() => InputTypeNumberComponent),
			multi: true,
		},
  ],
  encapsulation:ViewEncapsulation.None
})
export class InputTypeNumberComponent implements OnInit, ControlValueAccessor,AfterViewInit {
  
  
  @Input() cssClass:string=""
  @Input() ngClass:string=""
  @Input() value = '';
  @Input() inputId = 'phone';
  @Input() inputTelId = "phoneID";

  @ViewChild("inputTel") inputTel:NgxIntlTelInputComponent;
  
  formInput:FormControl=new FormControl();

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Cameroon];

  registerOnChangeFunction:(_:any)=>{};
  registerOnTouchedFunction:(_:any)=>{};
  writeValueData:any;
  isDisable:boolean;

  constructor(private host:ElementRef){}

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // console.log(this.inputTel,this.registerOnChange)
    if(this.registerOnChangeFunction) this.registerOnChange(this.registerOnChangeFunction);
    if(this.registerOnTouchedFunction) this.registerOnTouched(this.registerOnTouchedFunction)
    if(this.writeValueData) this.writeValue(this.writeValueData);
    // console.log("Phone input ",`#${this.inputTelId}`,)
    this.host.nativeElement.querySelector(`#${this.inputTelId}`).style=this.cssClass;
  }
  writeValue(obj: any): void {
   if(this.inputTel) setTimeout(()=>this.inputTel.writeValue(obj))
    else this.writeValueData=obj;
  }
  registerOnChange(fn: any): void {
    if(this.inputTel) this.inputTel.registerOnChange(fn);
    else this.registerOnChangeFunction=fn;
  }
  registerOnTouched(fn: any): void {
    if(this.inputTel) this.inputTel.registerOnTouched(fn)
    else this.registerOnTouchedFunction=fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if(this.inputTel) this.inputTel.setDisabledState(isDisabled)
    else this.isDisable=isDisabled;
  }

}

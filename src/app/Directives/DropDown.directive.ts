import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropDown]'
})

export class DropDownDirective{
    @HostBinding('class.open') isopen:boolean = false;
    @HostListener('click') cliked(){
        this.isopen = !this.isopen;
    }
}
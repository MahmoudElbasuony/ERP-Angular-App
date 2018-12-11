import { ToasterService } from "angular2-toaster";
export class ILoggerService {
    toastr: ToasterService;
    constructor(toastr: ToasterService) {
        this.toastr = toastr;
    }
}

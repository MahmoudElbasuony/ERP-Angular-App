var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var NotfoundComponent = (function () {
    function NotfoundComponent() {
    }
    NotfoundComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'notfound',
            templateUrl: 'notfound.component.html',
            styleUrls: ['notfound.component.css']
        })
    ], NotfoundComponent);
    return NotfoundComponent;
})();
exports.NotfoundComponent = NotfoundComponent;

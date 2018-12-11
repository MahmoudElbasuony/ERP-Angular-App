abstract;
var BaseCrudRepository = (function () {
    function BaseCrudRepository(controllerName, systemService) {
        this.systemService = systemService;
        this.controllerUrl = controllerName;
    }
    BaseCrudRepository.prototype.getAll = function (first, rows) {
        return this.systemService.getAll(this.controllerUrl, first, rows);
    };
    BaseCrudRepository.prototype.get = function (id) {
        return this.systemService.get(this.controllerUrl, id);
    };
    BaseCrudRepository.prototype.create = function (value) {
        return this.systemService.post(this.controllerUrl, value);
    };
    /**
     * Update
     * @param value
     */
    BaseCrudRepository.prototype.update = function (value) {
        return this.systemService.update(this.controllerUrl, value);
    };
    BaseCrudRepository.prototype.updateAll = function (value) {
        return this.systemService.update(this.controllerUrl, value);
    };
    /**
     * Remove using ID
     * @param value
     */
    BaseCrudRepository.prototype.delete = function (id) {
        return this.systemService.delete(this.controllerUrl, id);
    };
    return BaseCrudRepository;
})();

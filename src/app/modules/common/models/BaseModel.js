(function (ObjectState) {
    ObjectState[ObjectState["Unchanged"] = 0] = "Unchanged";
    ObjectState[ObjectState["Created"] = 1] = "Created";
    ObjectState[ObjectState["Changed"] = 2] = "Changed";
    ObjectState[ObjectState["Deleted"] = 3] = "Deleted";
})(exports.ObjectState || (exports.ObjectState = {}));
var ObjectState = exports.ObjectState;
abstract;
var BaseModel = (function () {
    function BaseModel() {
        this.State = ObjectState.Unchanged;
    }
    return BaseModel;
})();

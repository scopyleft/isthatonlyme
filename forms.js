exports.Question = function(data) {
    this.data = data;
    this.errors = {};
    this.validators = [];

    this.validate = function(field, func, message) {
        this.validators.push({
            field: field, func: func, message: message
        });
    }

    this.doValidate = function() {
        var v, value;
        for(var i in this.validators) {
            v = this.validators[i];
            value = ('field' in v && v.field in this.data) ? this.data[v.field]
                                                           : null;
            if(!v['func'](value)) {
                this.errors[v.field] = v.message;
            }
        }
    }

    this.isValid = function() {
        this.doValidate();
        return Object.keys(this.errors).length == 0;
    }
}

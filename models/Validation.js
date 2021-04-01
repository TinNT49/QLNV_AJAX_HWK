

var Validation = function () {
    //Mã nhân viên tối đa 4 - 6 ký số
    this.kiemTraDoDai = function (selector, name, error_selector, minlenght, maxlenth) {

        var value = document.querySelector(selector).value;
        if (value.length < minlenght || value.length > maxlenth) {
            document.querySelector(error_selector).innerHTML = `${name} từ ${minlenght} đến ${maxlenth} ký tự`;
            return false
        }
        document.querySelector(error_selector).innerHTML = '';
        return true
    }

    //Kiểm tra là số
    this.kiemTraLaSo = function (selector, name, error_selector) {
        var regex = /^[0-9]+$/;
        if (regex.test(document.querySelector(selector).value)) {
            console.log('in if');
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }

        console.log(selector);
        document.querySelector(error_selector).innerHTML = name + ' phải là số';
        return false;
    }

    //Kiểm tra là chữ
    this.kiemTraLaChu = function (selector, name, error_selector) {
        var regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (regex.test(document.querySelector(selector).value)) {
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }

        document.querySelector(error_selector).innerHTML = name + 'phải là chữ';
        return false;
    }

    //Kiểm tra giá trị
    this.kiemTraGiaTri = function (selector, name, error_selector, minValue, maxValue) {
        var value = document.querySelector(selector).value;

        if (value < minValue || value > maxValue) {
            document.querySelector(error_selector).innerHTML = `${name} từ ${minValue} đến ${maxValue}`;
            return false;
        }

        document.querySelector(error_selector).innerHTML = '';
        return true;
    }
}


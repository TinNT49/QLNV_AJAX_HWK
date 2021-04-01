var validate = new Validation();
console.log(axios);

var renderTable = function (arrNhanVien) {
    var content = '';

    for (var i = 0; i < arrNhanVien.length; i++) {
        var itemNV = arrNhanVien[i];
        var nhanVien = new NhanVien(itemNV.maNhanVien, itemNV.tenNhanVien, itemNV.chucVu, itemNV.heSoChucVu, itemNV.luongCoBan, itemNV.soGioLamTrongThang);
        console.log('Tổng lương', nhanVien.TinhTongLuong());
        //
        content += `
        <tr>
            <td>${nhanVien.maNhanVien}</td>
            <td>${nhanVien.tenNhanVien}</td>
            <td>${nhanVien.chucVu}</td>
            <td>${nhanVien.luongCoBan}</td>    
            <td>${nhanVien.TinhTongLuong()}</td>    
            <td>${nhanVien.soGioLamTrongThang}</td>
            <td>${nhanVien.XepLoai()}</td>
            <td><button class = "btn btn-danger" onclick = "xoaNhanVien('${nhanVien.maNhanVien}')">Xoá</button></td>
            <td><button class = "btn btn-danger" onclick = "suaNhanVien('${nhanVien.maNhanVien}')">Sửa</button></td>
        </tr>
        `;
    }
    document.querySelector('#tblNhanVien').innerHTML = content;
}

var renderNhanVien = function () {

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',
        responseType: 'json'
    });

    promise.then(function (result) {
        console.log('result', result.data);
        renderTable(result.data);
    });

    promise.catch(function (error) {
        console.log('error', error.response.data);
    });
}

renderNhanVien();



document.querySelector('#btnThemNhanVien').onclick = function () {

    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.chucVu = nhanVien.ChucVu(nhanVien.heSoChucVu);
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;

    var valid = true;

    valid &= validate.kiemTraDoDai('#maNhanVien', 'Mã nhân viên', '#kiemTraDoDai_maNhanVien', 4, 6);

    valid &= validate.kiemTraLaSo('#maNhanVien', 'Mã nhân viên', '#kiemTraLaSo_maNhanVien') & validate.kiemTraLaSo('#luongCoBan', 'Lương cơ bản', '#kiemTraLaSo_luongCoBan') & validate.kiemTraLaSo('#soGioLam', 'Số giờ làm', '#kiemTraLaSo_soGioLam')

    valid &= validate.kiemTraLaChu('#tenNhanVien', 'Tên nhân viên', '#kiemTraLaChu_tenNhanVien')

    valid &= validate.kiemTraGiaTri('#luongCoBan', 'Lương cơ bản', '#kiemTraGiaTri_luongCoBan', 1000000, 20000000) & validate.kiemTraGiaTri('#soGioLam', 'Số giờ làm', '#kiemTraGiaTri_soGioLam', 50, 150)

    if (!valid) {
        return;
    }

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        method: 'POST',
        data: nhanVien,
        responseType: 'json'
    });

    promise.then(function (result) {
        console.log('result', result.data);
        renderNhanVien();
    });

    promise.catch(function (error) {
        console.log('error', error.response.data);
    });
}

window.xoaNhanVien = function (maNhanVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
        method: 'DELETE'
    })

    promise.then(function (result) {
        console.log('result', result.data);
        renderNhanVien();
    });

    promise.catch(function (error) {
        console.log('error', error.response.data);
    });

}

window.suaNhanVien = function (maNhanVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: 'GET'
    })

    promise.then(function (result) {
        console.log('result', result.data);
        var nv = result.data;

        document.querySelector('#maNhanVien').value = nv.maNhanVien;
        document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
        document.querySelector('#chucVu').value = nv.heSoChucVu;
        document.querySelector('#luongCoBan').value = nv.luongCoBan;
        document.querySelector('#soGioLam').value = nv.soGioLamTrongThang;
    });

    promise.catch(function (error) {
        console.log('error', error.response.data);
    });
}

document.querySelector('#btnCapNhatNhanVien').onclick = function () {

    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.chucVu = nhanVien.ChucVu(nhanVien.heSoChucVu);
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;

    console.log('Nhân viên sửa', nhanVien);

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
        method: 'PUT',
        data: nhanVien
    });

    promise.then(function (result) {
        console.log('result', result.data);
        renderNhanVien();
    });

    promise.catch(function (error) {
        console.log('error', error.response.data);
    });
}
var NhanVien = function (maNV, tenNV, chucVuVN, hsChucVu, lgCoBan, soGioLam) {
  this.maNhanVien = maNV;
  this.tenNhanVien = tenNV;
  this.chucVu = chucVuVN;
  this.heSoChucVu = hsChucVu;
  this.luongCoBan = lgCoBan;
  this.soGioLamTrongThang = soGioLam;

  //Function
  //Lấy chức vụ của nhân viên
  this.ChucVu = function () {
    var arrOption = document.querySelector('#chucVu').options;
    var optChucVu = document.querySelector('#chucVu');

    var ChucVu = arrOption[optChucVu.selectedIndex].innerHTML;
    return ChucVu;
  };

  this.TinhTongLuong = function () {
    var tongLuong = 0;

    if (this.heSoChucVu === 3) {
      tongLuong = this.luongCoBan * 3;
    } else if (this.heSoChucVu === 2) {
      tongLuong = this.luongCoBan * 2;
    } else {
      tongLuong = this.luongCoBan * 1;
    }

    return tongLuong;
  };

  this.XepLoai = function () {
    var xepLoai = '';
    var soGioLam = Number(this.soGioLamTrongThang);

    if (soGioLam >= 120) {
      xepLoai = 'Nhân viên xuất sắc';
    }
    else if (soGioLam >= 100 && soGioLam < 120) {
      xepLoai = 'Nhân viên giỏi';
    }
    else if (soGioLam >= 80 && soGioLam < 100) {
      xepLoai = 'Nhân viên khá';
    }
    else if (soGioLam >= 50 && soGioLam < 100) {
      xepLoai = 'Nhân viên trung bình';
    }
    else {
      xepLoai = 'Nhân viên yếu';
    }

    return xepLoai;
  }

};

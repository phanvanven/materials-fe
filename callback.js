data =[
    "Phan",
    "Van",
    "Ven"
]
/*
class Array{
    public function map(hàm: callback) callback là đại diện một hàm callback sẽ truy vấn đến địa chỉ của hàm được gọi
    {
        làm này làm kia
        gọi lại tham số callback
    }

    hàm được định nghĩa từ bên ngoài có thể là ở đây
    public function map2(callback)
}
*/ 

// chúng ta đang định nghĩa thêm một hàm mới cho class Array
Array.prototype.map2 = function(type,callback){
    console.log('map2 được thực thi');
    console.log(type);
    let length = this.length;
    for(let i = 0; i < length; i++){
        callback(this[i]);// chỗ này trình biên dịch vẫn chưa phát hiện nó là gì đâu
    }
}
data.map2('click',function(item){
    console.log('callback được thực thi')
    /*sau khi chạy tới dòng 23 ở trên kia thì thằng ở dòng này sẽ được thực thi nè
    sau khi chạy xong thì nó sẽ thực thi lại vòng lặp ở trên và tiếp tục cho đến hết vòng lặp
    VẤN ĐỀ ĐẶT RA LÀ:
    NẾU CHÚNG TA TRUYỀN HÀM NHƯ DÒNG 24 THÌ TA CÓ THỂ NÀO TẠO MỘT HÀM CÓ ĐẶT TÊN
    NẰM Ở BÊN NGOÀI ĐƯỢC HAY KHÔNG?
    => HÀM TEST BÊN DƯỚI SẼ LÀ CÂU TRẢ LỜI
    */

    /*
        ĐỂ SỬ DỤNG MỘT HÀM ĐỊNH NGHĨA BÊN NGOÀI THÌ TA CHỈ CẦN
        ĐẶT HÀM ĐÓ VÀO TRONG ĐÂY
        DO ĐÓ TA SẼ THẤY RẰNG ĐỂ CHẠY ĐƯỢC HÀM ĐỊNH NGHĨA BÊN NGOÀI
        THÌ CẦN PHẢI THÔNG QUA MỘT HÀM NỮA HÀM ĐÓ ĐƯỢC TRUYỀN TRỰC TIẾP QUA THAM SỐ CỦA MAP2
    */ 
    test(item);
    console.log(item);
})

/*
DÓNG MẮT VÀO ĐÂY ĐỂ XEM CÂU TRẢ LỜI
=> CHÚNG TA THỰC THI HÀM MAP2 VÀ TRUYỀN THAM SỐ VÀO LÀ HÀM TEST
=> LỖI THAM SỐ ITEM TRONG HÀM TEST KHÔNG ĐƯỢC ĐỊNH NGHĨA => lý do ?
*/


/* GIẢI THÍCH:
    Về cơ bản nếu chúng ta dùng một hàm định nghĩa bên ngoài phạm vi của
    tham số hàm được truyền vào map2 cụ thể là hàm test
    và nếu như thế hàm test sẽ là hàm được thực thi trước hàm map2
    không thể tìm thấy tham số item truyền vào => lỗi
    có thể hiểu đơn giản là tham số hàm truyền vào map2 là mặc định
*/
function test(item){
    console.log('test được thực thi');
    console.log(item);
}
data.map2(test(item));

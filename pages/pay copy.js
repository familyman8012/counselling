import Axios from "axios";

const payOption = {
  price: "100",
  name: "설레임 심리상담",
};

const Index = () => (
  <div>
    <div className="box">
      <button onClick={onClickRequest}>부트페이 결제호출</button>
    </div>
  </div>
);

// componentdi

function onClickRequest() {
  window.BootPay.request({
    //실제 복사하여 사용시에는 모든 주석을 지운 후 사용하세요
    price: payOption.price, //실제 결제되는 가격
    application_id: "60d743385b29480021dc503c",
    name: payOption.name, //결제창에서 보여질 이름
    pg: "inicis",
    method: "", //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
    show_agree_window: 1, // 부트페이 정보 동의 창 보이기 여부
    user_info: {
      username: "윤은석",
      email: "familyman80@naver.com",
      addr: "서울시",
      phone: "010-1234-4567",
    },
    order_id: "order_id_1234", //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
    params: {
      callback1: "test1",
      callback2: "test2",
      customvar1234: "test3",
    },
  })
    .error(function (data) {
      //결제 진행시 에러가 발생하면 수행됩니다.
      console.log(data);
    })
    .cancel(function (data) {
      //결제가 취소되면 수행됩니다.
      console.log(data);
    })
    .ready(function (data) {
      // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
      console.log(data);
    })
    .confirm(function (data) {
      //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
      //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
      console.log(data);

      console.log("data.receipt_id", data.receipt_id);
      var t = { price: payOption.price, receipt_id: data.receipt_id };

      Axios.post("/api/pay/payverify", t).then((response) => {
        console.log(response);
        if (response.data.status_en === "complete") {
          BootPay.transactionConfirm(data);
        } else {
          BootPay.removePaymentWindow();
        }
      });
    })
    .close(function (data) {
      // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
      console.log(data);
    })
    .done(function (data) {
      //결제가 정상적으로 완료되면 수행됩니다
      //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.

      console.log(data);
    });
}

export default Index;

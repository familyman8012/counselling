import React from "react";

function ReviewPopup() {
  return (
    <div className="pop_review_write">
      <h1 className="tit">
        상담리뷰 작성
        <span class="btn_close">
          <span class="blind">닫기</span>
        </span>
      </h1>
      <div className="wrap_pop_cont">
        <div className="box_category">
          <span class="thumb"></span>
          <h2 class="txt">재회 종합반</h2>
        </div>
        <div className="box_rate">
          <h3>상담 어떠셨나요?</h3>
        </div>
        <div className="box_form">
          <input type="text" value="" placeholder="작성자" />
          <textarea placeholder="어떤 점이 좋으셨나요?"></textarea>
        </div>
      </div>
      <div className="btn_submit">등록</div>
    </div>
  );
}

export default ReviewPopup;

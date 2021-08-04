import React, { useState, useEffect } from "react";
import { Rate } from "antd";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { loadDetail, priceSelect, onisModal } from "../../redux/productSlice";
import RateItem from "../../components/common/RateItem";
const PriceItem = React.memo(({ priceItem }) => {
  const dispatch = useDispatch();
  return (
    <>
      <ul className="price">
        {priceItem.map((item, i) => (
          <li onClick={() => dispatch(priceSelect(i + 1))}>
            {item.title} : {item.price}
          </li>
        ))}
      </ul>
    </>
  );
});

const ReviewRate = React.memo(({ rate, disabled, onChange }) => {
  console.log("rate, disabled", rate, disabled);
  return <RateItem rate={rate} disabled={disabled} onChange={onChange} />;
});

const ReviewTable = () => {
  return <div className="wrap_product_review"></div>;
};

const Product = () => {
  const router = useRouter();
  const { detailInfo, priceItem, selectPrice, isModal } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  console.log("priceItem", priceItem);
  const { id } = router.query;

  useEffect(() => {
    {
      id ? dispatch(loadDetail(id)) : "";
    }
  }, [id]);

  useEffect(() => {
    dispatch(priceSelect(0));
  }, []);

  return (
    <>
      {detailInfo && (
        <div className="wrap_product_detail">
          <div className="top">
            <div className="box_product_img">
              <img src={detailInfo[0].imgUrl} alt={detailInfo[0].alt} />
            </div>
            <div className="wrap_detail_info">
              <div className="product_info">
                <div className="wrap_simple_info">
                  <div className="title">{detailInfo[0].title}</div>
                  <PriceItem priceItem={priceItem} />
                </div>
                <div className="desc">{detailInfo[0].text}</div>
                <div className="box_sel_price">
                  <p className="tit">상담선택*</p>
                  {selectPrice !== null ? (
                    <div
                      className="selected_info"
                      onClick={() => dispatch(onisModal())}
                    >
                      {selectPrice[0].title} : {selectPrice[0].price}
                    </div>
                  ) : (
                    <div
                      className="selected_info"
                      onClick={() => dispatch(onisModal())}
                    >
                      상담선택(필수)
                    </div>
                  )}
                  {isModal && <PriceItem priceItem={priceItem} />}
                  <div className="box_btns">
                    {selectPrice !== null ? (
                      <a
                        href={selectPrice[0].payUrl}
                        target="_blank"
                        className="btn"
                      >
                        결제
                      </a>
                    ) : (
                      <span className="btn">상담을 선택해주세요</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="wrap_tab">
            <li className="on">구매평</li>
            <li>Q&A</li>
          </ul>
          <div className="wrap_review">
            <h2 className="tit">구매평 </h2>
            <p className="txt">상품을 구매하신 분들이 작성한 리뷰입니다.</p>
            <button>구매평 작성</button>
          </div>
          <ReviewRate rate={1} disabled={false} onChange={true} />
        </div>
      )}
    </>
  );
};

export default React.memo(Product);

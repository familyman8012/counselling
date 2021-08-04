import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { load, loadSuccess, loadFail } from "../redux/imgSliceSaga";

function imgTest() {
  const dispatch = useDispatch();
  const { isLoading, images, error } = useSelector(
    (state) => state.unsplashImg
  );
  useEffect(() => {
    dispatch(load());
  }, []);
  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>에러</div>;
  }
  return (
    <div className="content">
      <section className="grid">
        {images.map((image) => (
          <div
            key={image.id}
            className={`item item-${Math.ceil(image.height / image.width)}`}
          >
            <img src={image.urls.small} alt={image.user.username} />
          </div>
        ))}
      </section>
    </div>
  );
}

export default imgTest;

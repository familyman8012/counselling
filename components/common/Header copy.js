import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { menuMove, selectMenuMove } from "../../appmodules/headerSlice";

const Gnb = () => {
  const router = useRouter();
  const menuList = useSelector(selectMenuMove);
  const dispatch = useDispatch();

  console.log("menuList", menuList);

  return (
    <ul class="main-nav__list">
      {menuList &&
        menuList.map((menuItem) => {
          <li className={router.pathname == "/" ? "active" : null}>
            <Link href="/">
              <a>홈</a>
            </Link>
          </li>;
        })}

      <li className={router.pathname == "/about" ? "active" : null}>
        <Link href="/about">
          <a>심리상담센터소개</a>
        </Link>
      </li>
      <li className={router.pathname == "/services" ? "active" : null}>
        <Link href="/services">
          <a>심리상담서비스</a>
        </Link>
      </li>
      <li>
        <a href="https://smartstore.naver.com/nolsoop" target="_blank">
          신청하기
        </a>
      </li>
      <li className={router.pathname == "/blog" ? "active" : null}>
        <Link href="/blog">
          <a>블로그</a>
        </Link>
      </li>
      <li className={router.pathname == "/contacts" ? "active" : null}>
        <Link href="/contacts">
          <a>사연등록</a>
        </Link>
      </li>
    </ul>
  );
};

const Header = () => {
  return (
    <header class="wrapp-header">
      <div class="header-box-01">
        <div class="container">
          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4 text-xs-center">
              <a href="./" class="logo">
                <img src="images/logo.png" alt="" />
              </a>
            </div>
            <div class="col-sm-8 col-md-8 col-lg-8 text-xs-center text-right">
              <p class="phone-info">
                <span>Call:</span> 800 326 9160
              </p>
              <a class="btn-app" href="appointment.html">
                MAKE AN APPOINTMENT
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Main navigation --> */}
      <div class="header-box-02">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="main-nav">
                <div class="main-nav__btn">
                  <div class="icon-left"></div>
                  <div class="icon-right"></div>
                </div>
                <div class="header-box-03">
                  <div class="shopping-cart">
                    <a href="#" class="shopping-btn">
                      Shopping cart
                      <p class="shopping-info">2</p>
                    </a>
                    <div class="shopping-cart__dropdown">
                      <ul class="shopping-cart__list">
                        <li>
                          <table class="shopping-cart__table">
                            <tr>
                              <td>
                                <a class="shopping-cart__close" href="#">
                                  Close
                                </a>
                              </td>
                              <td>
                                <figure class="shopping-cart__img">
                                  <a href="#">
                                    <img
                                      src="images/shop/shopping_cart/shopping_cart_img_01.jpg"
                                      alt=""
                                    />
                                  </a>
                                </figure>
                              </td>
                              <td>
                                <h3 class="shopping-cart__title">
                                  <a href="#">Intuitions</a>
                                </h3>
                                <p class="shopping-cart__text">
                                  Dr. Sandra Miller
                                </p>
                                <p class="shopping-cart__price">
                                  <span>1 x</span>$ 100.00
                                </p>
                              </td>
                            </tr>
                          </table>
                        </li>
                        <li>
                          <table class="shopping-cart__table">
                            <tr>
                              <td>
                                <a class="shopping-cart__close" href="#">
                                  Close
                                </a>
                              </td>
                              <td>
                                <figure class="shopping-cart__img">
                                  <a href="#">
                                    <img
                                      src="images/shop/shopping_cart/shopping_cart_img_02.jpg"
                                      alt=""
                                    />
                                  </a>
                                </figure>
                              </td>
                              <td>
                                <h3 class="shopping-cart__title">
                                  <a href="#">Happines</a>
                                </h3>
                                <p class="shopping-cart__text">
                                  Dr. Sandra Miller
                                </p>
                                <p class="shopping-cart__price">
                                  <span>1 x</span>$ 100.00
                                </p>
                              </td>
                            </tr>
                          </table>
                        </li>
                      </ul>
                      <p class="shopping-cart__subtotal">
                        <span>Subtotal:</span> $ 220.00
                      </p>
                      <div class="shopping-cart__btn">
                        <a href="#" class="shopping-cart__btn-01">
                          View cart
                        </a>
                        <a href="#" class="shopping-cart__btn-02">
                          Checkout
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="search-box">
                    <a class="search-btn" href="#">
                      Search
                    </a>
                    <div class="search-box__dropdown">
                      <form action="./" class="search-box__form">
                        <input
                          class="search-box__input"
                          type="text"
                          name="search_btn"
                          placeholder="Search..."
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <Gnb />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

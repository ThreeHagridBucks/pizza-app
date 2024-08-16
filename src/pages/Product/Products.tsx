import { Await, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";
import Button from "../../components/Button/Button";
import styles from "./Products.module.css";
import { useNavigate } from "react-router-dom";
import Headling from "../../components/Headling/Headling";
import { useDispatch } from "react-redux";
import { AppDispath } from "../../store/store";
import { cartActions } from "../../store/сart.slice";

export function Products() {
  const dispatch = useDispatch<AppDispath>();
  const navigate = useNavigate();
  const data = useLoaderData() as { data: Product };

  return (
    <Suspense fallback={"Загружаю..."}>
      <Await resolve={data.data}>
        {({ data }: { data: Product }) => (
          <>
            <div className={styles["header"]}>
              <Button
                className={styles["btn-back"]}
                onClick={() => navigate("/")}
              >
                <img src="/strelka-back.svg" alt="Назад в меню"></img>
              </Button>
              <Headling>{data.name}</Headling>
              <Button
                className={styles["btn-cart"]}
                onClick={() => dispatch(cartActions.add(data.id))}
              >
                <img src="/cart-button-icon.svg" alt="Добавить в корзину"></img>
                В корзину
              </Button>
            </div>
            <div className={styles["main"]}>
              <div
                className={styles["pizza-img"]}
                style={{ backgroundImage: `url('${data.image}')` }}
              ></div>
              <div className={styles["text"]}>
                <div className={styles["price"]}>
                  Цена
                  <span className={styles["span-price"]}>
                    {data.price}
                    &nbsp;<span className={styles["price-rub"]}>₽</span>
                  </span>
                </div>
                <hr className={styles["br"]}></hr>
                <div className={styles["rating"]}>
                  Рейтинг
                  <span className={styles["rating-star"]}>
                    {data.rating}&nbsp;
                    <img src="/star-icon.svg" alt="Иконка звезды"></img>
                  </span>
                </div>
                <div className={styles["item-compound"]}>
                  <span className={styles["compound"]}>Состав:</span>
                  <div className={styles["ingredients"]}>
                    <ul className={styles["ul-ingredients"]}>
                      {data.ingredients.map((ingredient, index) => (
                        <li className={styles["ingredient"]} key={index}>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Await>
    </Suspense>
  );
}

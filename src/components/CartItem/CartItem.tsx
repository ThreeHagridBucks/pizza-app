import { useDispatch } from "react-redux";
import styles from "./CartItem.module.css";
import { CartItemProps } from "./CartItem.props";
import { AppDispath } from "../../store/store";
import { cartActions } from "../../store/сart.slice";

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispath>();

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const descrease = () => {
    dispatch(cartActions.remove(props.id));
  };

  const remove = () => {
    dispatch(cartActions.delete(props.id));
  };

  return (
    <div className={styles["item"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>
      <div className={styles["description"]}>
        <div className={styles["name"]}>{props.name}</div>
        <div className={styles["currency"]}>{props.price}&nbsp;₽</div>
      </div>
      <div className={styles["actions"]}>
        <button className={styles["minus"]} onClick={descrease}>
          <img src="/minus-icon.svg" alt="Удалить из корзины"></img>
        </button>
        <div className={styles["number"]}>{props.count}</div>
        <button className={styles["plus"]} onClick={increase}>
          <img src="/plus-icon.svg" alt="Добавить в корзину"></img>
        </button>
        <button className={styles["remove"]} onClick={remove}>
          <img src="/delete-icon.svg" alt="Удалить все"></img>
        </button>
      </div>
    </div>
  );
}

export default CartItem;

import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Cart1 from "./cart1";
import styles from "./item-template.module.css";

export type ItemTemplateType = {
  className?: string;
  zAH9D56260021000000Ligh?: string;
  propPadding?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
};

const ItemTemplate: NextPage<ItemTemplateType> = ({
  className = "",
  propAlignSelf,
  propFlex,
  propMinWidth,
  zAH9D56260021000000Ligh,
  propPadding,
}) => {
  const itemTemplateStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flex: propFlex,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf, propFlex, propMinWidth]);

  return (
    <div
      className={[styles.itemTemplate, className].join(" ")}
      style={itemTemplateStyle}
    >
      <Cart1
        zAH9D56260021000000Ligh={zAH9D56260021000000Ligh}
        propPadding={propPadding}
      />
      <img
        className={styles.addToCartButton}
        alt=""
        src="/add-to-cart-button.svg"
      />
    </div>
  );
};

export default ItemTemplate;

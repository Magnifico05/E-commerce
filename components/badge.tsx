import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./badge.module.css";

export type BadgeType = {
  className?: string;
  labtops?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propMinWidth?: CSSProperties["minWidth"];
  propTextDecoration?: CSSProperties["textDecoration"];
  propColor?: CSSProperties["color"];
};

const Badge: NextPage<BadgeType> = ({
  className = "",
  propBackgroundColor,
  labtops,
  propMinWidth,
  propTextDecoration,
  propColor,
}) => {
  const badgeStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  const labtopsStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
      textDecoration: propTextDecoration,
      color: propColor,
    };
  }, [propMinWidth, propTextDecoration, propColor]);

  return (
    <div className={[styles.badge, className].join(" ")} style={badgeStyle}>
      <div className={styles.labtops} style={labtopsStyle}>
        {labtops}
      </div>
    </div>
  );
};

export default Badge;

import React from "react";
import { BackTop as AntdBackTop } from "antd";
import { FeatherIcons } from "../../antd_components";

const BackTop = ({ pallete }) => {
  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: pallete.lightblue,
    color: pallete.white,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <AntdBackTop>
      <div style={style}>
        <FeatherIcons icon='chevron-up' />
      </div>
    </AntdBackTop>
  );
};

export default BackTop;

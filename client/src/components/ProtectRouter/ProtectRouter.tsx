import { LabelingModeEnum } from "@/enums";
import { useBoundStore } from "@/store";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface Props {}

const ProtectRouter: React.FC<Props> = () => {
  const navigate = useNavigate();
  const labelingMode = useBoundStore((state) => state.labelingMode);

  useEffect(() => {
    if (labelingMode === LabelingModeEnum.NONE) {
      navigate("/home");
    }
  }, []);

  return <Outlet />;
};

export default ProtectRouter;

import { useEffect } from "react";
import { darkColors, lightColors } from "./colors";
import { useDispatch, useSelector } from "react-redux";
import { setColors } from "../../redux/slices/globalSlice";

const useColor = () => {
  const dispatch = useDispatch();

  const { darkMode, colors } = useSelector((state) => state.global);

  useEffect(() => {
    if (darkMode) {
      dispatch(setColors(darkColors));
    } else {
      dispatch(setColors(lightColors));
    }
    // eslint-disable-next-line
  }, [darkMode]);

  return colors;
};

export default useColor;

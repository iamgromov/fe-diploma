import { useEffect, useRef } from "react";

export const useDidMountEffect = () => {
  const didMount = useRef(false);

  useEffect(() => {
    didMount.current = true;
  }, []);

  return didMount.current;
};

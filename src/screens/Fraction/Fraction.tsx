// IMPORTS
import { useEffect } from "react";
import { setPeriodsTableData } from "@/slices/fractionDataSlice";
import { setData } from "@/slices/calculateFractionDataSlice";
import { useDispatch } from "react-redux";
import { Title } from "@/shared/components/Title";
import { FRACTION } from "@/constants/const";
import { FractionTabs } from "./components/FractionTabs";

function Fraction() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setPeriodsTableData([]));
      dispatch(setData({}));
    };
  }, [dispatch]);

  const content = (
    <section className="flex-col u-margin-bottom-xl">
      <Title title={FRACTION} back={true} />

      <FractionTabs />
    </section>
  );
  return content;
}

export default Fraction;

import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import {
  TabsUnstyled,
  TabsListUnstyled,
  TabPanelUnstyled,
  buttonUnstyledClasses,
} from "@mui/base";
import TextTranslation from "../constants/TextTranslation";
import AuctionInfoForm from "./AuctionInfoForm";
import AuctionImages from "./AuctionImages";
import ReviewAuction from "./ReviewAuction";
import { resetAuction } from "../../features/auctionSlice";

const Tab = styled(TabUnstyled)`
  color: #7d7d7d;
  cursor: pointer;
  font-size: 12px;
  font-family: Poopins-SemiBold;
  background-color: #d6d6d6;
  width: 100%;
  padding: 0px 16px;
  margin: 0px 1px;
  border: none;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #014493;
    color: #fff;
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid #014493;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #014493;
    color: #fff;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: Poopins-SemiBold;
  font-size: 12px;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const AuctionFormTabs = ({ setAddingAuction }) => {
  const [nextTab, setNextTab] = useState(0);
  const [tabData, setTabData] = useState([]);

  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language);

  useEffect(() => {
    setTabData([
      TextTranslation.basicInformation[lang.langIndex],
      TextTranslation.gallery[lang.langIndex],
      TextTranslation.viewAd[lang.langIndex],
    ]);
    // eslint-disable-next-line
  }, [lang]);

  useEffect(()=> {
    dispatch(resetAuction());
  }, []);

  return (
    <TabsUnstyled defaultValue={0} value={nextTab}>
      <TabsList
        sx={{
          display: "flex",
          flexDirection: lang.langIndex === 2 ? "row-reverse" : "row",
        }}
      >
        {tabData.map((item, index) => (
          <Tab key={index} onClick={() => setNextTab(index)}>
            {item}
          </Tab>
        ))}
      </TabsList>
      <div
        style={{
          border: "2px solid #014493",
          borderRadius: 20,
          padding: 10,
        }}
      >
        <TabPanel value={0}>
          <AuctionInfoForm setNextTab={setNextTab} />
        </TabPanel>
        <TabPanel value={1}>
          <AuctionImages setNextTab={setNextTab} />
        </TabPanel>
        <TabPanel value={2}>
          <ReviewAuction
            setNextTab={setNextTab}
            setAddingAuction={setAddingAuction}
          />
        </TabPanel>
      </div>
    </TabsUnstyled>
  );
};

export default AuctionFormTabs;

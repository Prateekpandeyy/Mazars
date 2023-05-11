import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { Breadcrumbs } from "@material-ui/core";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { baseUrl } from "../../config/config";
import { Markup } from "interweave";
import classes from "./design.module.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import MyContainer from "../../components/Common/MyContainer";
import SubHeading from "../../components/Common/SubHeading";
import CustomHeading from "../../components/Common/CustomHeading";
const FaqQuestion = () => {
  const [list, setList] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const getList = () => {
    axios.get(`${baseUrl}/customers/getfaq`).then((res) => {
      if (res.data.code === 1) {
        setList(res.data.result);
      }
    });
  };
  useEffect(() => {
    getList();
  }, []);
  const handleChange = (panel) => (event, isExpanded) => {
    if (expanded.includes(panel)) {
      let k = expanded.filter((i) => {
        return panel !== i;
      });
      setExpanded(k);
    } else {
      setExpanded((oldData) => {
        return [...oldData, panel];
      });
    }
  };

  return (
    <>
      <OuterloginContainer>
        <Header noSign="noSign" />
        <MyContainer>
          <div className={classes.articleContent}>
            {
              <div className={classes.articlesDetails}>
                <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
                  <CustomHeading>
                    Frequently asked questions (FAQ)
                  </CustomHeading>
                </Breadcrumbs>

                <div className={classes.articleContent}>
                  {list &&
                    list.map((i) => (
                      <>
                        <Accordion
                          key={i.id}
                          expanded={expanded.includes(i.id) === true}
                          onChange={handleChange(i.id)}
                        >
                          <AccordionSummary
                            expandIcon={
                              expanded.includes(i.id) === true ? (
                                <RemoveIcon />
                              ) : (
                                <AddIcon />
                              )
                            }
                            aria-controls={i.id}
                            id={i.id}
                          >
                            <SubHeading>{i.question}</SubHeading>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div id="artContent" style={{ all: "unset" }}>
                              <Markup content={i.answer} />
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </>
                    ))}
                </div>
              </div>
            }
          </div>
        </MyContainer>
        <Footer />
      </OuterloginContainer>
    </>
  );
};
export default FaqQuestion;

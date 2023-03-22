import React, { useEffect, useState, Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw } from "draft-js";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "DiaryEditor.module.css";

const contentStyle = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Initialized from content state.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

type Data = {
  temperature: number;
  humidity: number;
  uvindexValue: number;
  uvindexdesc: string;
  icon: string;
};


export const DiaryEditor: React.FC = () => {
  const [content, setContent] = useState(contentStyle);
  const [data, setData] = useState<Data>();

  const contentState = convertFromRaw(content);

  function onContentStateChange(contentState: any) {
    setContent(contentState);
  }

  function diaryDate ():string{
    const date = new Date();
    return date.toString().slice(0,15)
  }

  useEffect(() => {
    const todayWeather = async () => {
      let res = await fetch(
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en"
      );

      let json = await res.json();

      // define the change of uvIndex at night and morning
      let uvIndex = 0;
      if (typeof json.uvindex != "string") {
        uvIndex = json.uvindex.data[0].value;
      }

      let uvLevel = "";
      if (typeof json.uvindex != "string") {
        uvLevel += "(" + json.uvindex.data[0].desc + ")";
      }

      setData({
        temperature: json.temperature.data[0].value,
        humidity: json.humidity.data[0].value,
        uvindexValue: uvIndex,
        uvindexdesc: uvLevel,
        icon: json.icon
      });
    };
    todayWeather();
  }, []);
  
  
  return (
    <>
      <div className={styles.weatherWrapper}>
        <div className={styles.dateAndTemp}>{diaryDate()}
        {<div className={styles.temperature}>{data?.temperature}°C</div>}
        </div>
        <img
          className = {styles.dayWeatherIcon}
          src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${data?.icon}.png`}
          alt="weather icon"
        />
      </div>

      <FormGroup>
        <Label>Header</Label>
        <Input></Input>
      </FormGroup>

      <Editor
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onContentStateChange={onContentStateChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "history",
            "embedded",
            "emoji",
            "image",
          ],
          inline: { inDropdown: true },
          list: { inDropDown: false },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropDown: false },
        }}
        hashtag={{
          separator: " ",
          trigger: "#",
        }}
        mention={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
            "remove",
            "history",
          ],
          separator: " ",
          trigger: "@",
          environment: "",
          Category: "",
          suggestions: [
            { text: "APPLE", value: "apple", url: "apple" },
            { text: "BANANA", value: "banana", url: "banana" },
            { text: "CHERRY", value: "cherry", url: "cherry" },
            { text: "DURIAN", value: "durian", url: "durian" },
            { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
            { text: "FIG", value: "fig", url: "fig" },
            { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
            { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
          ],
        }}
      />
    </>
  );
};

export default DiaryEditor;
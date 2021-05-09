import React from "react";
import styles from "./Card.module.css";
import { Card, CardMedia, Typography, CardContent } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Filter from "./Filter";
import CardComponent from "./CardComponent";
import querystring from "querystring";

const CardsList = () => {
  const [launchYear, setlaunchYear] = useState(null);
  const [launchSuccess, setlaunchSuccess] = useState(null);
  const [landSuccess, setlandSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [spaceData, setSpaceData] = useState([]);
  let url = "https://api.spacexdata.com/v3/launches?limit=100&";
  const filters = useRef({
    launch_year: null,
    launch_success: null,
    land_success: null
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const result = await axios.get(
      `https://api.spaceXdata.com/v3/launches?limit=100`
    );
    setSpaceData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    loadDatabyFilters(filters);
  }, [filters]);

  const getnewUrl = (filters = {}) => {
    //console.log(filters);
    return url + querystring.stringify({ ...filters });
  };
  const loadDatabyFilters = async (filters) => {
    const newurl = getnewUrl(filters);
    setLoading(true);
    console.log(newurl);
    const result = await axios.get(newurl);

    console.log(result.data);
    setSpaceData(result.data);
    setLoading(false);
  };

  const updateApiFilters = (type, value) => {
    filters.current = {
      launch_year: launchYear,
      launch_success: launchSuccess,
      land_success: landSuccess
    };
    const filterLists = {
      ...filters.current,
      [type]: value
    };
    console.log(filterLists);
    loadDatabyFilters(filterLists);
  };

  const onChangeYearHandler = (year, e) => {
    //active = !active;
    // e.target.style = { btn_class };
    setlaunchYear(year);
    updateApiFilters("launch_year", year);
  };
  const onLaunchSuccess = (success, e) => {
    setlaunchSuccess(success);
    updateApiFilters("launch_success", success);
  };

  const onLandSuccess = (success, e) => {
    setlandSuccess(success);
    updateApiFilters("land_success", success);
  };

  return (
    <div className={styles.container}>
      <Filter
        launchYear={(val, e) => onChangeYearHandler(val, e)}
        launchSuccess={(val, e) => onLaunchSuccess(val, e)}
        landSuccess={(val, e) => onLandSuccess(val, e)}
      />
      <span> {loading && <h4> Loading.... </h4>}</span>

      {spaceData.map((item, index) => (
        <>
          <CardComponent
            key={index}
            flightNumber={item.flight_number}
            missionName={item.mission_name}
            missionId={item.mission_id}
            launchYear={item.launch_year}
            launchSuccess={`${item.launch_success}`}
            imageSrc={item.links.mission_patch_small}
            launchLanding={`${item.rocket.first_stage.cores[0].land_success}`}
          />
        </>
      ))}
    </div>
  );
};
export default CardsList;

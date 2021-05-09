import React from "react";
import styles from "./Card.module.css";
import { Card, CardMedia, Typography, CardContent } from "@material-ui/core";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import axios from "axios";
const CardComponent = (props) => {
  return (
    <section>
      <Card className={styles.container} style={{ display: "inline-block" }}>
        <CardMedia>
          <img src={props.imageSrc} alt="spaceX" />
        </CardMedia>

        <CardContent>
          <Typography style={{ color: "blue" }}>{props.missionName}</Typography>
          <Typography>Mission Id:{props.missionId}</Typography>
          <Typography>Launch Year:{props.launchYear}</Typography>
          <Typography>Launch Success:{props.launchSuccess}</Typography>
          <Typography>Land Success:{props.launchLanding}</Typography>
        </CardContent>
      </Card>
    </section>
  );
};

export default CardComponent;

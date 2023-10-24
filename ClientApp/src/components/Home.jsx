import React, { Component } from "react";
import { Layout } from "./Layout";
import "./Home.css";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <Layout>
        <div id="homepage-background"></div>
      </Layout>
    );
  }
}

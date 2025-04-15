import { User } from "./User";
import React, { Component } from "react";
import UserF from "./UserF"

class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        <UserF />
      </div>
    );
  }
}

export default About;

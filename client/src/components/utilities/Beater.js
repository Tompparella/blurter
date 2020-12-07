import React from 'react';
var beater = document.getElementById("beater");
import { css } from "@emotion/core";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class AwesomeComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true
      };
    }
   
    render() {
      return (
        <div className="sweet-loading">
          <ClipLoader
            css={override}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    }
  }
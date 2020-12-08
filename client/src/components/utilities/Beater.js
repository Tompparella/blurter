import React from 'react';
import { css } from "@emotion/core";
import { BeatLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export class Beater extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true
      };
    }

    turnOn() {
      this.setState( {
        loading: true
      })
    }

    turnOff() {
      this.setState({
        loading: false
      });
    }
   
    render() {
      return (
        <div className="sweet-loading">
          <BeatLoader
            css={override}
            size={25}
            color={"white"}
            loading={this.state.loading}
          />
        </div>
      );
    }
  }
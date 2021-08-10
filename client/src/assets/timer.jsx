import React from "react";
import { makeStyles } from "@material-ui/core/styles";

class Timer extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
          counter:0,
          adsCollection:[
            ["https://s0.2mdn.net/9096388/LaysLunarNewYear6V3728X90EN.gif","https://tpc.googlesyndication.com/simgad/4880340395375037383"],
            ["https://s0.2mdn.net/5065908/06302021-134719388-LDA21_022927_JulyOnline_ROC_728x90_E1.jpg","https://s0.2mdn.net/951733/July_Static_Banner_InMarket_728x90_EN.jpg"],
            ["https://tpc.googlesyndication.com/simgad/3537459843823764383","https://cdn.acuityplatform.com/rtb/2021/07/BP_1170232/GB_36_TopperAds_728x90_C.jpg"],
          ],
          demoing:[],
        };
    }

    componentDidMount = () => {
        console.log(this.state.counter);
        setInterval(() => {
            this.setState(prevState => ({
                counter: prevState.counter + 1,
                demoing: prevState.adsCollection[prevState.counter % 3],
            }));
        }, 3000);
        
    };
  
    render() {
      
      return (
        <div id = "ads">
            {this.state.counter === 0?
            <div>
                <img src={this.state.adsCollection[2][0]} border="0" width="740" height="90" alt="" class="img_ad" style={{ marginLeft: 30 }}></img>
                <img src={this.state.adsCollection[2][1]} border="0" width="740" height="90" alt="" class="img_ad" style={{ marginLeft: 30 }}></img>
            </div>
             :
             <div>
                <img src={this.state.demoing[0]} border="0" width="740" height="90" alt="" class="img_ad" style={{ marginLeft: 30 }}></img>
                <img src={this.state.demoing[1]} border="0" width="740" height="90" alt="" class="img_ad" style={{ marginLeft: 30 }}></img>
             </div>
             }
        </div>
      );
    }
  }
  
  export default Timer;

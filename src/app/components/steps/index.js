/*
 
*/ 
import React, { Component } from 'react';
import { Row, Col, Button,Popover } from 'antd';
import PropTypes from 'prop-types';
import * as Util from '../../../util/index';
import './index.less';

export default class Mysteps extends Component {
	constructor(props) {
		super(props);

        this.getIconStyle = this.getIconStyle.bind(this);
        
        
	}

    
    getIconStyle(nowStep,currentStep){

        if(nowStep < currentStep){

            //蓝色打钩
            return (
                <i className="iconfont dp-icon">&#xe77d;</i>
            )
        }else if(nowStep == currentStep){

            //当前
            return (
                <span className='dp-steps-current dp-icon'>{nowStep + 1}</span>
            )
        }else {
            //未完成样式
            return (
                <span className='dp-steps-undone dp-icon'>{nowStep + 1}</span>
            )
        }
    }

    haveTip(data,index){

        if(data.id){

                let content = (
                    <div>
                        <span>
                            {data.remark}
                        </span>
                    </div>
                );

            
                return (
                    <ul>
                        <li>操作人:{data.opusUserName}</li>
                        <li>操作时间:{data.opusTimeStr}</li>
                        {
                            data.remark ?
                            <div>
                                <Popover content={content} overlayStyle={{width:'300px'}}>
                            <li className={'dp-remark-li-'+index+' dp-remark-li'}>
                            备注:{data.remark}  
                                <div className={'dp-ellips-'+index+' dp-ellips'}>
                                    ...
                                </div> 
                            </li>
                            </Popover>
                            <li className={'dp-copy-li-'+index+' dp-copy-li'}>备注:{data.remark}</li>
                            </div> : ''
                        }
                    </ul>
                );
        }

        
    }

    componentDidMount(){

        let that = this;

        setTimeout(function(){

            console.log('didMount');
        console.log('didMount');

   
       
        for(let i = 0;i < that.props.steps.length; i++){

            let copyLi = document.getElementsByClassName('dp-copy-li-'+i)[0];
            let remarkLi = document.getElementsByClassName('dp-remark-li-'+i)[0];
            
            if(copyLi && remarkLi && copyLi.offsetHeight > remarkLi.offsetHeight){

                
                copyLi.style.display = 'none';
                
            }else if(document.getElementsByClassName('dp-ellips-'+i)[0]){
               
                document.getElementsByClassName('dp-ellips-'+i)[0].style.display = 'none';
            }
        }
        },200)
        

        

    }

    componentDidUpdate(){
        
        
    }

	render() {
        
        return this.props.steps && this.props.steps.map((ele,i)=>{
            return(
            <div className="step-items" key={i}>				
				
                {this.getIconStyle(i,this.props.currentStep)}
                <div className='step-item-right'>
                    <div>{ele.opusTypeStr}</div>
                    {this.haveTip(ele,i)}
                </div>  				
			
			</div>
            )
        })
        

	}
}

Mysteps.propTypes = {
	steps: PropTypes.array.isRequired
}